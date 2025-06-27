import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import WizardPages from './components/WizardPages/WizardPages';
import DataTable from './components/DataTable';
import AdminForm from './components/AdminForm';
import { AdminProvider } from './components/AdminContext'; // Import AdminProvider
import './App.css';

const App = () => {
  // Define your dynamic pages (steps)
  const wizardPages = [
    { path: "/page/1", component: <WizardPages page={1} /> },
    { path: "/page/2", component: <WizardPages page={2} /> },
    { path: "/page/3", component: <WizardPages page={3} /> },
  ];

  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          
          {/* Dynamically render the wizard pages */}
          {wizardPages.map((page, index) => (
            <Route key={index} path={page.path} element={page.component} />
          ))}

          <Route path="/data" element={<DataTable />} />
          <Route path="/admin" element={<AdminForm />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
};

export default App;
