import { useMemo, useState } from "react";
import { Badge, Button, ButtonGroup, Card, Form, Modal, Pagination, Table } from "react-bootstrap";
import { clearMedicines, deleteMedicine, loadMedicines, updateMedicine } from "../data/medicineStorage";

const ITEMS_PER_PAGE = 5;

function MedicineListPage() {
  const [medicineList, setMedicineList] = useState(loadMedicines);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [deletingMedicine, setDeletingMedicine] = useState(null);
  const [showClearDataModal, setShowClearDataModal] = useState(false);

  const shouldPaginate = medicineList.length > ITEMS_PER_PAGE;
  const totalPages = Math.ceil(medicineList.length / ITEMS_PER_PAGE);
  const pageStartIndex = shouldPaginate ? (currentPage - 1) * ITEMS_PER_PAGE : 0;
  const pageEndIndex = shouldPaginate ? pageStartIndex + ITEMS_PER_PAGE : medicineList.length;
  const visibleMedicines = useMemo(
    () => medicineList.slice(pageStartIndex, pageEndIndex),
    [medicineList, pageEndIndex, pageStartIndex],
  );

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
    const updatedMedicines = deleteMedicine(deletingMedicine.id);
    const updatedTotalPages = Math.ceil(updatedMedicines.length / ITEMS_PER_PAGE);

    setMedicineList(updatedMedicines);
    setCurrentPage((page) => Math.min(page, Math.max(updatedTotalPages, 1)));
    setDeletingMedicine(null);
  };

  const confirmClearData = () => {
    setMedicineList(clearMedicines());
    setCurrentPage(1);
    setShowClearDataModal(false);
  };

  return (
    <>
      <Card className="content-card comfortable-card medicine-list-card">
        <Card.Body className="comfortable-card-body">
          <Table responsive hover className="medicine-list-table align-middle mb-0">
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
                  <td colSpan={5} className="py-5 text-center text-muted">
                    Nenhum medicamento cadastrado.
                  </td>
                </tr>
              ) : (
                visibleMedicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>
                      <span className="medicine-list-name">{medicine.name}</span>
                      {medicine.notes && (
                        <span className="medicine-notes-preview">Obs: {medicine.notes}</span>
                      )}
                    </td>
                    <td>{medicine.dose}</td>
                    <td>{medicine.time}</td>
                    <td>
                      <Badge
                        className="medicine-list-status"
                        bg={medicine.status === "Tomado" ? "success" : "warning"}
                        text={medicine.status === "Tomado" ? undefined : "dark"}
                      >
                        {medicine.status}
                      </Badge>
                    </td>
                    <td className="text-end">
                      <ButtonGroup className="medicine-list-actions">
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
          {shouldPaginate && (
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-4">
              <span className="text-muted">
                Mostrando {pageStartIndex + 1}-{Math.min(pageEndIndex, medicineList.length)} de{" "}
                {medicineList.length} medicamentos
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
          {medicineList.length > 0 && (
            <div className="medicine-list-tools">
              <span className="text-muted">Use esta opcao para preparar um novo teste.</span>
              <Button
                className="medicine-clear-button"
                variant="outline-danger"
                onClick={() => setShowClearDataModal(true)}
              >
                Limpar dados
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={Boolean(editingMedicine)} onHide={() => setEditingMedicine(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar medicamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingMedicine && (
            <Form className="comfortable-form">
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
          <Button className="comfortable-action" variant="outline-secondary" onClick={() => setEditingMedicine(null)}>
            Cancelar
          </Button>
          <Button className="comfortable-action" variant="primary" onClick={saveEditedMedicine}>
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
          <Button className="comfortable-action" variant="outline-secondary" onClick={() => setDeletingMedicine(null)}>
            Cancelar
          </Button>
          <Button className="comfortable-action" variant="danger" onClick={confirmDeleteMedicine}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showClearDataModal} onHide={() => setShowClearDataModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Limpar dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">
            Tem certeza que deseja apagar todos os medicamentos cadastrados neste navegador?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="comfortable-action"
            variant="outline-secondary"
            onClick={() => setShowClearDataModal(false)}
          >
            Cancelar
          </Button>
          <Button className="comfortable-action" variant="danger" onClick={confirmClearData}>
            Limpar dados
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedicineListPage;
