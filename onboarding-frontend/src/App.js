import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import WizardPages from './components/WizardPages';
import DataTable from './components/DataTable';
import AdminForm from './components/AdminForm';
import { AdminProvider } from './components/AdminContext'; // Import AdminProvider
import './App.css';


const App = () => {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/page1" element={<WizardPages />} />
          <Route path="/page2" element={<WizardPages />} />
          <Route path="/page3" element={<WizardPages />} />
          <Route path="/data" element={<DataTable />} />
          <Route path="/admin" element={<AdminForm />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
};

export default App;
