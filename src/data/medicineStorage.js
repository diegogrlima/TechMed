import { medicines as initialMedicines } from "./medicines";

const MEDICINES_STORAGE_KEY = "techmed:medicines";
const MEDICINES_STATUS_DATE_KEY = "techmed:medicines-status-date";

function getTodayKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function saveStatusDate() {
  localStorage.setItem(MEDICINES_STATUS_DATE_KEY, getTodayKey());
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

  const resetMedicines = medicines.map((medicine) => ({
    ...medicine,
    status: "Pendente",
  }));

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
    medicine.id === updatedMedicine.id ? updatedMedicine : medicine,
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
