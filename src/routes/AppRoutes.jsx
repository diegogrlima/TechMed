import { Navigate, Route, Routes } from "react-router";
import AppLayout from "../layouts/AppLayout";
import MedicineFormPage from "../pages/MedicineFormPage";
import MedicineListPage from "../pages/MedicineListPage";
import MedicineSchedulePage from "../pages/MedicineSchedulePage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/medicamentos/cadastrar" replace />} />
        <Route path="/medicamentos/cadastrar" element={<MedicineFormPage />} />
        <Route path="/medicamentos/horarios" element={<MedicineSchedulePage />} />
        <Route path="/medicamentos/lista" element={<MedicineListPage />} />
        <Route path="*" element={<Navigate to="/medicamentos/cadastrar" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
