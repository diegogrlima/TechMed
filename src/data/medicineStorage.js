import { medicines as initialMedicines } from "./medicines";

const MEDICINES_STORAGE_KEY = "techmed:medicines";

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
    return Array.isArray(parsedMedicines) ? parsedMedicines : initialMedicines;
  } catch {
    return initialMedicines;
  }
}

export function saveMedicines(medicines) {
  localStorage.setItem(MEDICINES_STORAGE_KEY, JSON.stringify(medicines));
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
