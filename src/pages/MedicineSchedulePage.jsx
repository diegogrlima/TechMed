import { useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { loadMedicines, updateMedicine } from "../data/medicineStorage";

function MedicineSchedulePage() {
  const [scheduleMedicines, setScheduleMedicines] = useState(loadMedicines);

  const markAsTaken = (medicineId) => {
    const medicineToUpdate = scheduleMedicines.find((medicine) => medicine.id === medicineId);

    if (!medicineToUpdate) {
      return;
    }

    setScheduleMedicines(updateMedicine({ ...medicineToUpdate, status: "Tomado" }));
  };

  return (
    <Row className="g-3">
      {scheduleMedicines.map((medicine) => (
        <Col md={4} key={medicine.id}>
          <Card className="content-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start gap-3">
                <div>
                  <Card.Title>{medicine.time}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{medicine.name}</Card.Subtitle>
                </div>
                <Badge
                  bg={medicine.status === "Tomado" ? "success" : "warning"}
                  text={medicine.status === "Tomado" ? undefined : "dark"}
                >
                  {medicine.status}
                </Badge>
              </div>
              <Card.Text className="mb-3">Dose: {medicine.dose}</Card.Text>
              <Button
                variant={medicine.status === "Tomado" ? "outline-success" : "success"}
                size="sm"
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
  );
}

export default MedicineSchedulePage;
