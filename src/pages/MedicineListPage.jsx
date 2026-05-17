import { useState } from "react";
import { Badge, Button, ButtonGroup, Card, Form, Modal, Table } from "react-bootstrap";
import { deleteMedicine, loadMedicines, updateMedicine } from "../data/medicineStorage";

function MedicineListPage() {
  const [medicineList, setMedicineList] = useState(loadMedicines);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [deletingMedicine, setDeletingMedicine] = useState(null);

  const handleEditChange = (field, value) => {
    setEditingMedicine((currentMedicine) => ({
      ...currentMedicine,
      [field]: value,
    }));
  };

  const saveEditedMedicine = () => {
    setMedicineList(updateMedicine(editingMedicine));
    setEditingMedicine(null);
  };

  const confirmDeleteMedicine = () => {
    setMedicineList(deleteMedicine(deletingMedicine.id));
    setDeletingMedicine(null);
  };

  return (
    <>
      <Card className="content-card">
        <Card.Body>
          <Table responsive hover className="align-middle mb-0">
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Dosagem</th>
                <th>Horario</th>
                <th>Status</th>
                <th className="text-end">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {medicineList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-muted">
                    Nenhum medicamento cadastrado.
                  </td>
                </tr>
              ) : (
                medicineList.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.name}</td>
                    <td>{medicine.dose}</td>
                    <td>{medicine.time}</td>
                    <td>
                      <Badge
                        bg={medicine.status === "Tomado" ? "success" : "warning"}
                        text={medicine.status === "Tomado" ? undefined : "dark"}
                      >
                        {medicine.status}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <ButtonGroup size="sm">
                        <Button variant="outline-primary" onClick={() => setEditingMedicine(medicine)}>
                          Editar
                        </Button>
                        <Button variant="outline-danger" onClick={() => setDeletingMedicine(medicine)}>
                          Excluir
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={Boolean(editingMedicine)} onHide={() => setEditingMedicine(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar medicamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingMedicine && (
            <Form>
              <Form.Group className="mb-3" controlId="editMedicineName">
                <Form.Label>Nome do medicamento</Form.Label>
                <Form.Control
                  value={editingMedicine.name}
                  onChange={(event) => handleEditChange("name", event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editMedicineDose">
                <Form.Label>Dosagem</Form.Label>
                <Form.Control
                  value={editingMedicine.dose}
                  onChange={(event) => handleEditChange("dose", event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editMedicineTime">
                <Form.Label>Horario</Form.Label>
                <Form.Control
                  type="time"
                  value={editingMedicine.time}
                  onChange={(event) => handleEditChange("time", event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="editMedicineStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editingMedicine.status}
                  onChange={(event) => handleEditChange("status", event.target.value)}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Tomado">Tomado</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mt-3" controlId="editMedicineNotes">
                <Form.Label>Observacoes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editingMedicine.notes || ""}
                  onChange={(event) => handleEditChange("notes", event.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setEditingMedicine(null)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={saveEditedMedicine}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={Boolean(deletingMedicine)} onHide={() => setDeletingMedicine(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Excluir medicamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletingMedicine && (
            <p className="mb-0">
              Tem certeza que deseja excluir o medicamento <strong>{deletingMedicine.name}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setDeletingMedicine(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteMedicine}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedicineListPage;
