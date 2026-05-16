import { Card, Table } from "react-bootstrap";
import { medicines } from "../data/medicines";

function MedicineListPage() {
  return (
    <Card className="content-card">
      <Card.Body>
        <Table responsive hover className="align-middle mb-0">
          <thead>
            <tr>
              <th>Medicamento</th>
              <th>Dosagem</th>
              <th>Horario</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.dose}</td>
                <td>{medicine.time}</td>
                <td>{medicine.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default MedicineListPage;
