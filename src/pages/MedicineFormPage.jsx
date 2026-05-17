import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";

function MedicineFormPage() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  return (
    <Card className="content-card">
      <Card.Body>
        {showSuccessAlert && (
          <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
            Medicamento cadastrado com sucesso!
          </Alert>
        )}

        <Form>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>Nome do medicamento</Form.Label>
              <Form.Control placeholder="Ex: Dipirona" />
            </Col>
            <Col md={3}>
              <Form.Label>Dosagem</Form.Label>
              <Form.Control placeholder="Ex: 500 mg" />
            </Col>
            <Col md={3}>
              <Form.Label>Horario</Form.Label>
              <Form.Control type="time" />
            </Col>
            <Col md={12}>
              <Form.Label>Observacoes</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Instrucao de uso, intervalo ou alerta" />
            </Col>
          </Row>
          <Button className="mt-4" type="button" variant="primary" onClick={() => setShowSuccessAlert(true)}>
            Salvar medicamento
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default MedicineFormPage;
