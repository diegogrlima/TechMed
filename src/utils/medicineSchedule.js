const DAY_IN_MINUTES = 24 * 60;
const OVERDUE_WARNING_MINUTES = 120;

export function getMinutesFromTime(time) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

export function getTodayKey(currentDate = new Date()) {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getFormattedCurrentTime(currentTime) {
  return currentTime.toTimeString().slice(0, 5);
}

export function getTimeUntilMedicine(medicineTime, currentTime) {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const medicineMinutes = getMinutesFromTime(medicineTime);
  const minutesUntil = medicineMinutes >= currentMinutes
    ? medicineMinutes - currentMinutes
    : DAY_IN_MINUTES - currentMinutes + medicineMinutes;

  if (minutesUntil === 0) {
    return "agora";
  }

  const hours = Math.floor(minutesUntil / 60);
  const minutes = minutesUntil % 60;

  if (hours === 0) {
    return `em ${minutes} min`;
  }

  if (minutes === 0) {
    return `em ${hours}h`;
  }

  return `em ${hours}h ${minutes}min`;
}

function getDaysBetweenDates(startDateKey, endDateKey) {
  const startDate = new Date(`${startDateKey}T00:00:00`);
  const endDate = new Date(`${endDateKey}T00:00:00`);

  return Math.floor((endDate - startDate) / 86400000);
}

function getMinutesOverdue(medicineTime, currentTime) {
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const medicineMinutes = getMinutesFromTime(medicineTime);

  return currentMinutes - medicineMinutes;
}

export function getPendingMedicineAlerts(medicines, currentTime) {
  const today = getTodayKey(currentTime);
  const pendingMedicines = medicines.filter((medicine) => medicine.status !== "Tomado");
  const criticalMedicines = pendingMedicines.filter(
    (medicine) => medicine.missedSinceDate && getDaysBetweenDates(medicine.missedSinceDate, today) >= 1,
  );
  const warningMedicines = pendingMedicines.filter(
    (medicine) =>
      !medicine.missedSinceDate && getMinutesOverdue(medicine.time, currentTime) >= OVERDUE_WARNING_MINUTES,
  );

  return [
    {
      id: "critical",
      variant: "danger",
      title: "Medicamento pendente ha mais de um dia",
      description: "Estes medicamentos precisam de atencao, pois ficaram pendentes desde outro dia.",
      medicines: criticalMedicines,
    },
    {
      id: "warning",
      variant: "warning",
      title: "Medicamento pendente ha algumas horas",
      description: "Estes medicamentos ja passaram do horario cadastrado e ainda nao foram marcados como tomados.",
      medicines: warningMedicines,
    },
  ].filter((alert) => alert.medicines.length > 0);
}
