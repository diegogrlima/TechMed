import { Badge, Card, Col, Row } from "react-bootstrap";
import { medicines } from "../data/medicines";

function MedicineSchedulePage() {
  return (
    <Row className="g-3">
      {medicines.map((medicine) => (
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
              <Card.Text>Dose: {medicine.dose}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default MedicineSchedulePage;
