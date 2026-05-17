import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, Col, Modal, Pagination, Row } from "react-bootstrap";
import { loadMedicines, updateMedicine } from "../data/medicineStorage";

const ITEMS_PER_PAGE = 6;
const DAY_IN_MINUTES = 24 * 60;

function getMinutesFromTime(time) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function getFormattedCurrentTime(currentTime) {
  return currentTime.toTimeString().slice(0, 5);
}

function getTimeUntilMedicine(medicineTime, currentTime) {
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

function MedicineSchedulePage() {
  const [scheduleMedicines, setScheduleMedicines] = useState(loadMedicines);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [dismissedMedicineAlerts, setDismissedMedicineAlerts] = useState([]);

  const shouldPaginate = scheduleMedicines.length > ITEMS_PER_PAGE;
  const formattedCurrentTime = getFormattedCurrentTime(currentTime);
  const totalPages = Math.ceil(scheduleMedicines.length / ITEMS_PER_PAGE);
  const pageStartIndex = shouldPaginate ? (currentPage - 1) * ITEMS_PER_PAGE : 0;
  const pageEndIndex = shouldPaginate ? pageStartIndex + ITEMS_PER_PAGE : scheduleMedicines.length;
  const visibleMedicines = useMemo(
    () => scheduleMedicines.slice(pageStartIndex, pageEndIndex),
    [pageEndIndex, pageStartIndex, scheduleMedicines],
  );
  const nextMedicine = useMemo(() => {
    const pendingMedicines = scheduleMedicines.filter((medicine) => medicine.status !== "Tomado");

    if (pendingMedicines.length === 0) {
      return null;
    }

    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    return pendingMedicines
      .map((medicine) => {
        const medicineMinutes = getMinutesFromTime(medicine.time);
        const minutesUntil = medicineMinutes >= currentMinutes
          ? medicineMinutes - currentMinutes
          : DAY_IN_MINUTES - currentMinutes + medicineMinutes;

        return { ...medicine, minutesUntil };
      })
      .sort((firstMedicine, secondMedicine) => firstMedicine.minutesUntil - secondMedicine.minutesUntil)[0];
  }, [currentTime, scheduleMedicines]);
  const alertMedicines = useMemo(
    () =>
      scheduleMedicines.filter(
        (medicine) =>
          medicine.status !== "Tomado" &&
          medicine.time === formattedCurrentTime &&
          !dismissedMedicineAlerts.includes(`${medicine.id}-${formattedCurrentTime}`),
      ),
    [dismissedMedicineAlerts, formattedCurrentTime, scheduleMedicines],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const markAsTaken = (medicineId) => {
    const medicineToUpdate = scheduleMedicines.find((medicine) => medicine.id === medicineId);

    if (!medicineToUpdate) {
      return;
    }

    setScheduleMedicines(updateMedicine({ ...medicineToUpdate, status: "Tomado" }));
  };

  const dismissMedicineAlert = () => {
    setDismissedMedicineAlerts((currentAlerts) => [
      ...currentAlerts,
      ...alertMedicines.map((medicine) => `${medicine.id}-${formattedCurrentTime}`),
    ]);
  };

  return (
    <>
      {scheduleMedicines.length > 0 && (
        <Card className="content-card next-medicine-card">
          <Card.Body className="next-medicine-body">
            {nextMedicine ? (
              <>
                <div>
                  <span className="next-medicine-label">Proximo medicamento</span>
                  <div className="next-medicine-main">
                    <strong>{nextMedicine.name}</strong>
                    <Badge
                      bg={nextMedicine.status === "Tomado" ? "success" : "warning"}
                      text={nextMedicine.status === "Tomado" ? undefined : "dark"}
                    >
                      {nextMedicine.status}
                    </Badge>
                  </div>
                  <p className="next-medicine-details">
                    {nextMedicine.time} - Dose: {nextMedicine.dose} -{" "}
                    {getTimeUntilMedicine(nextMedicine.time, currentTime)}
                  </p>
                </div>
                <Button
                  className="schedule-card-button next-medicine-action"
                  variant="success"
                  onClick={() => markAsTaken(nextMedicine.id)}
                >
                  Marcar como tomado
                </Button>
              </>
            ) : (
              <div>
                <span className="next-medicine-label">Proximo medicamento</span>
                <p className="next-medicine-details mb-0">Todos os medicamentos pendentes foram tomados.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
      {scheduleMedicines.length === 0 ? (
        <Card className="content-card comfortable-card">
          <Card.Body className="comfortable-card-body text-center text-muted">
            Nenhum medicamento agendado.
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          {visibleMedicines.map((medicine) => (
            <Col md={4} key={medicine.id}>
              <Card className="content-card schedule-card h-100">
                <Card.Body className="schedule-card-body">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <Card.Title className="schedule-card-time">{medicine.time}</Card.Title>
                      <Card.Subtitle className="schedule-card-name text-muted">{medicine.name}</Card.Subtitle>
                    </div>
                    <Badge
                      className="schedule-card-status"
                      bg={medicine.status === "Tomado" ? "success" : "warning"}
                      text={medicine.status === "Tomado" ? undefined : "dark"}
                    >
                      {medicine.status}
                    </Badge>
                  </div>
                  <Card.Text className="schedule-card-dose">Dose: {medicine.dose}</Card.Text>
                  {medicine.notes && (
                    <Card.Text className="medicine-notes-text">Obs: {medicine.notes}</Card.Text>
                  )}
                  <Button
                    className="schedule-card-button"
                    variant={medicine.status === "Tomado" ? "outline-success" : "success"}
                    disabled={medicine.status === "Tomado"}
                    onClick={() => markAsTaken(medicine.id)}
                  >
                    Tomado
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {shouldPaginate && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-4">
          <span className="text-muted">
            Mostrando {pageStartIndex + 1}-{Math.min(pageEndIndex, scheduleMedicines.length)} de{" "}
            {scheduleMedicines.length} medicamentos
          </span>
          <Pagination className="mb-0">
            <Pagination.Prev
              className="medicine-list-page-link"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <Pagination.Item
                  className="medicine-list-page-link"
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              className="medicine-list-page-link"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            />
          </Pagination>
        </div>
      )}

      <Modal show={alertMedicines.length > 0} onHide={dismissMedicineAlert} centered>
        <Modal.Header closeButton>
          <Modal.Title>Horario do medicamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="medicine-alert-intro">
            Existe medicamento pendente para tomar agora, as {formattedCurrentTime}.
          </p>
          <div className="medicine-alert-list">
            {alertMedicines.map((medicine) => (
              <div className="medicine-alert-item" key={medicine.id}>
                <div>
                  <strong>{medicine.name}</strong>
                  <span>Dose: {medicine.dose}</span>
                  {medicine.notes && <span>Obs: {medicine.notes}</span>}
                </div>
                <Button variant="success" onClick={() => markAsTaken(medicine.id)}>
                  Marcar como tomado
                </Button>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="comfortable-action" variant="outline-secondary" onClick={dismissMedicineAlert}>
            Agora nao
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedicineSchedulePage;
