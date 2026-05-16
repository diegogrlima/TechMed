import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router";
import Sidebar from "../components/Sidebar";
import { pageMetadata } from "../routes/pageMetadata";

const fallbackPage = pageMetadata["/medicamentos/cadastrar"];

function AppLayout() {
  const { pathname } = useLocation();
  const currentPage = pageMetadata[pathname] ?? fallbackPage;

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Container fluid className="p-0">
          <div className="page-header">
            <span>{currentPage.eyebrow}</span>
            <h1>{currentPage.title}</h1>
            <p>{currentPage.description}</p>
          </div>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default AppLayout;
