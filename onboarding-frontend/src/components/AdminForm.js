import React, { useState, useContext } from 'react';
import { AdminContext } from './AdminContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminForm = () => {
  const { config, setConfig } = useContext(AdminContext); // Access the admin config context

  // Initialize localConfig with a fallback to empty arrays for pages
  const [localConfig, setLocalConfig] = useState({
    page1: config?.page1 || [],
    page2: config?.page2 || [],
    page3: config?.page3 || [],
  });

  const navigate = useNavigate();

  // Handle changes in the checkbox selections
  const handleChange = (page, component) => {
    setLocalConfig(prevConfig => {
      const updatedPage = [...prevConfig[page]];
      if (updatedPage.includes(component)) {
        updatedPage.splice(updatedPage.indexOf(component), 1); // Remove if already selected
      } else {
        updatedPage.push(component); // Add if not selected
      }
      return {
        ...prevConfig,
        [page]: updatedPage,
      };
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("localConfig", localConfig);
    setConfig(localConfig); // Update the global config with the changes made by admin
    navigate("/page/1");  // Use the dynamic route format for page navigation
    alert('Admin configuration updated!');
  };

  const renderCheckboxes = (page) => {
    const components = {
      page1: ['email', 'password', 'firstName', 'lastName'],
    page2: ['address', 'birthdate'], 
    page3: ['aboutMe']
    };

    return components[page]?.map(component => (
      <label key={component}>
        <input
          type="checkbox"
          checked={localConfig[page]?.includes(component)}
          onChange={() => handleChange(page, component)}
        />
        {component.charAt(0).toUpperCase() + component.slice(1)}
      </label>
    ));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Configuration</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={styles.form}>
        {/* Check if config is defined before trying to render */}
        {Object.keys(localConfig).length > 0 && Object.keys(localConfig).map((page, index) => (
          <div key={index}>
            <h3>{page.charAt(0).toUpperCase() + page.slice(1)} Configuration</h3>
            <div style={styles.checkboxGroup}>
              {renderCheckboxes(page)}
            </div>
          </div>
        ))}
        <button type="submit" style={styles.button}>Save Configuration</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AdminForm;
