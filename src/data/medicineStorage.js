import { medicines as initialMedicines } from "./medicines";
import { getTodayKey } from "../utils/medicineSchedule";

const MEDICINES_STORAGE_KEY = "techmed:medicines";
const MEDICINES_STATUS_DATE_KEY = "techmed:medicines-status-date";

function saveStatusDate() {
  localStorage.setItem(MEDICINES_STATUS_DATE_KEY, getTodayKey());
}

function normalizeUpdatedMedicine(updatedMedicine, currentMedicine) {
  if (updatedMedicine.status !== "Tomado") {
    return updatedMedicine;
  }

  return {
    ...updatedMedicine,
    lastTakenAt: currentMedicine?.status === "Tomado" ? currentMedicine.lastTakenAt : new Date().toISOString(),
    missedSinceDate: undefined,
  };
}

function resetDailyStatuses(medicines) {
  const today = getTodayKey();
  const storedStatusDate = localStorage.getItem(MEDICINES_STATUS_DATE_KEY);

  if (!storedStatusDate) {
    localStorage.setItem(MEDICINES_STATUS_DATE_KEY, today);
    return medicines;
  }

  if (storedStatusDate === today) {
    return medicines;
  }

  const resetMedicines = medicines.map((medicine) => {
    const wasPending = medicine.status !== "Tomado";

    return {
      ...medicine,
      status: "Pendente",
      missedSinceDate: wasPending ? medicine.missedSinceDate || storedStatusDate : undefined,
    };
  });

  localStorage.setItem(MEDICINES_STORAGE_KEY, JSON.stringify(resetMedicines));
  localStorage.setItem(MEDICINES_STATUS_DATE_KEY, today);

  return resetMedicines;
}

export function loadMedicines() {
  if (typeof localStorage === "undefined") {
    return initialMedicines;
  }

  const storedMedicines = localStorage.getItem(MEDICINES_STORAGE_KEY);

  if (!storedMedicines) {
    return initialMedicines;
  }

  try {
    const parsedMedicines = JSON.parse(storedMedicines);
    return Array.isArray(parsedMedicines) ? resetDailyStatuses(parsedMedicines) : initialMedicines;
  } catch {
    return initialMedicines;
  }
}

export function saveMedicines(medicines) {
  localStorage.setItem(MEDICINES_STORAGE_KEY, JSON.stringify(medicines));
  saveStatusDate();
}

export function createMedicine(medicineData) {
  const medicines = loadMedicines();
  const newMedicine = {
    id: crypto.randomUUID(),
    status: "Pendente",
    ...medicineData,
  };
  const updatedMedicines = [...medicines, newMedicine];

  saveMedicines(updatedMedicines);

  return newMedicine;
}

export function updateMedicine(updatedMedicine) {
  const updatedMedicines = loadMedicines().map((medicine) =>
    medicine.id === updatedMedicine.id ? normalizeUpdatedMedicine(updatedMedicine, medicine) : medicine,
  );

  saveMedicines(updatedMedicines);

  return updatedMedicines;
}

export function markMedicineAsTaken(medicineId) {
  const updatedMedicines = loadMedicines().map((medicine) =>
    medicine.id === medicineId
      ? {
          ...medicine,
          status: "Tomado",
          lastTakenAt: new Date().toISOString(),
          missedSinceDate: undefined,
        }
      : medicine,
  );

  saveMedicines(updatedMedicines);

  return updatedMedicines;
}

export function deleteMedicine(medicineId) {
  const updatedMedicines = loadMedicines().filter((medicine) => medicine.id !== medicineId);

  saveMedicines(updatedMedicines);

  return updatedMedicines;
}

export function clearMedicines() {
  saveMedicines([]);

  return [];
}
