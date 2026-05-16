import { Nav } from "react-bootstrap";
import { NavLink } from "react-router";

const menuItems = [
  { path: "/medicamentos/cadastrar", label: "Cadastrar medicamento" },
  { path: "/medicamentos/horarios", label: "Visualizar horario do remedio" },
  { path: "/medicamentos/lista", label: "Lista medicamento" },
];

function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">TM</span>
        <div>
          <strong>TechMed</strong>
          <small>Controle de remedios</small>
        </div>
      </div>

      <Nav className="flex-column sidebar-nav" variant="pills">
        {menuItems.map((item) => (
          <Nav.Link
            as={NavLink}
            className="sidebar-link"
            end
            key={item.path}
            to={item.path}
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </aside>
  );
}

export default Sidebar;
