import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// 🧭 Layout Components
import Navbar from '../components/common/Navbar';

// 🔒 Security Check (Aapki apni banayi hui file)
import ProtectedRoute from './ProtectedRoutes';

// 📄 Pages (Saleha's Part)
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import StudentDashboard from '../pages/student/StudentDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ShippingServices from '../pages/shipping/ShippingServises';

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shipping-services" element={<ShippingServices />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;