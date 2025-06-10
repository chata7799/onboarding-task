import React, { useState, useContext } from 'react';
import { AdminContext } from './AdminContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminForm = () => {
  const { config, setConfig } = useContext(AdminContext); // Access the admin config context
  const [localConfig, setLocalConfig] = useState({ ...config });

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

  const handleSubmit = () => {
    console.log("localConfig",localConfig)
    setConfig(localConfig); // Update the global config with the changes made by admin
    navigate("/page1")
    alert('Admin configuration updated!');

  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Configuration</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={styles.form}>
        <h3>Page 2 Configuration</h3>
        <div style={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={localConfig.page2.includes('address')}
              onChange={() => handleChange('page2', 'address')}
            />
            Address
          </label>
          <label>
            <input
              type="checkbox"
              checked={localConfig.page2.includes('birthdate')}
              onChange={() => handleChange('page2', 'birthdate')}
            />
            Birthdate
          </label>
        </div>

        <h3>Page 3 Configuration</h3>
        <div style={styles.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={localConfig.page3.includes('aboutMe')}
              onChange={() => handleChange('page3', 'aboutMe')}
            />
            About Me
          </label>
        </div>

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
