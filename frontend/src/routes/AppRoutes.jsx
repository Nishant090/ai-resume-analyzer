import { Routes, Route } from "react-router-dom";
import Landing from "../pages/public/Landing.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Upload from "../pages/dashboard/Upload.jsx";
import History from "../pages/dashboard/History.jsx";
import Analysis from "../pages/dashboard/Analysis.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/history" element={<History />} />
        <Route path="/analysis/:id" element={<Analysis />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
