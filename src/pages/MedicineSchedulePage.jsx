import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { loadMedicines, updateMedicine } from "../data/medicineStorage";

const ITEMS_PER_PAGE = 6;

function MedicineSchedulePage() {
  const [scheduleMedicines, setScheduleMedicines] = useState(loadMedicines);
  const [currentPage, setCurrentPage] = useState(1);

  const shouldPaginate = scheduleMedicines.length > ITEMS_PER_PAGE;
  const totalPages = Math.ceil(scheduleMedicines.length / ITEMS_PER_PAGE);
  const pageStartIndex = shouldPaginate ? (currentPage - 1) * ITEMS_PER_PAGE : 0;
  const pageEndIndex = shouldPaginate ? pageStartIndex + ITEMS_PER_PAGE : scheduleMedicines.length;
  const visibleMedicines = useMemo(
    () => scheduleMedicines.slice(pageStartIndex, pageEndIndex),
    [pageEndIndex, pageStartIndex, scheduleMedicines],
  );

  const markAsTaken = (medicineId) => {
    const medicineToUpdate = scheduleMedicines.find((medicine) => medicine.id === medicineId);

    if (!medicineToUpdate) {
      return;
    }

    setScheduleMedicines(updateMedicine({ ...medicineToUpdate, status: "Tomado" }));
  };

  return (
    <>
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
    </>
  );
}

export default MedicineSchedulePage;
