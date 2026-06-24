import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 🧭 Layout Components
import Navbar from '../components/common/Navbar'; 

// 🔒 Security Check (Aapki apni banayi hui file)
import ProtectedRoute from './protectedroutes'; // 👈 Agar naam 'protectedroutes.jsx' hai

// 📄 Pages (Saleha's Part)
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/public/LoginPage';       
import RegisterPage from '../pages/public/RegisterPage'; 

// 📊 Dummy components jab tak Prinkle ka code nahi aata
const StudentDashboard = () => <div className="p-8"><h2>Student Dashboard</h2></div>;

const AppRoutes = () => {
  return (
    <Router>
      <Navbar /> 
      
      <Routes>
        {/* 🟢 Public Routes (In par koi restriction nahi hai, koi bhi khol sakta hai) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />        
        <Route path="/register" element={<RegisterPage />} />  

        {/* 🔒 Protected Routes (Sirf login users ke liye - Prinkle's Part) */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;