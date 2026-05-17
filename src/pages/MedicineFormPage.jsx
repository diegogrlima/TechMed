import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { createMedicine } from "../data/medicineStorage";

function MedicineFormPage() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [medicine, setMedicine] = useState({
    name: "",
    dose: "",
    time: "",
    notes: "",
  });

  const handleChange = (field, value) => {
    setMedicine((currentMedicine) => ({
      ...currentMedicine,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createMedicine(medicine);
    setMedicine({
      name: "",
      dose: "",
      time: "",
      notes: "",
    });
    setShowSuccessAlert(true);
  };

  return (
    <Card className="content-card comfortable-card">
      <Card.Body className="comfortable-card-body">
        {showSuccessAlert && (
          <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
            Medicamento cadastrado com sucesso!
          </Alert>
        )}

        <Form className="comfortable-form" onSubmit={handleSubmit}>
          <Row className="g-4">
            <Col md={6}>
              <Form.Label>Nome do medicamento</Form.Label>
              <Form.Control
                placeholder="Ex: Dipirona"
                value={medicine.name}
                onChange={(event) => handleChange("name", event.target.value)}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>Dosagem</Form.Label>
              <Form.Control
                placeholder="Ex: 500 mg"
                value={medicine.dose}
                onChange={(event) => handleChange("dose", event.target.value)}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Label>Horario</Form.Label>
              <Form.Control
                type="time"
                value={medicine.time}
                onChange={(event) => handleChange("time", event.target.value)}
                required
              />
            </Col>
            <Col md={12}>
              <Form.Label>Observacoes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Instrucao de uso, intervalo ou alerta"
                value={medicine.notes}
                onChange={(event) => handleChange("notes", event.target.value)}
              />
            </Col>
          </Row>
          <Button className="comfortable-action mt-4" type="submit" variant="primary">
            Salvar medicamento
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default MedicineFormPage;
