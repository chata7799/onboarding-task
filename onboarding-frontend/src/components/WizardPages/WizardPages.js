import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../AdminContext';
import axios from 'axios';
import WizardPage1 from '../WizardPages/WizardPage1';
import WizardPage2 from '../WizardPages/WizardPage2';
import WizardPage3 from '../WizardPages/WizardPage3';

const WizardPages = () => {
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: { street: '', city: '', state: '', zip: '' },
    birthdate: '',
    aboutMe: '',
  });
  const [errors, setErrors] = useState({});

  const { config } = useContext(AdminContext);
  const navigate = useNavigate();

  // Validation logic
  const validate = () => {
    const newErrors = {};
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = 'Email is required and must be valid';
    if (!userData.password || userData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!userData.firstName) newErrors.firstName = 'First name is required';
    if (!userData.lastName) newErrors.lastName = 'Last name is required';
    if (page === 2) {
      if (!userData.address.street || !userData.address.city || !userData.address.state || !userData.address.zip) {
        newErrors.address = 'All address fields are required';
      }
    }
    if (page === 3 && !userData.aboutMe) {
      newErrors.aboutMe = 'About Me section cannot be empty';
    }
    return newErrors;
  };

  const handleNextPage = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (page < Object.keys(config).length) {
        setPage(page + 1);
        navigate(`/page/${page + 1}`); 
      }
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      navigate(`/page/${page - 1}`); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in userData.address) {
      setUserData({
        ...userData,
        address: {
          ...userData.address,
          [name]: value,
        },
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:5000/user', userData);
        alert('User data submitted successfully!');
        navigate('/data');
      } catch (error) {
        alert('Error submitting data!');
      }
    }
  };

  const renderPageContent = () => {
    switch (page) {
      case 1:
        return <WizardPage1 userData={userData} handleInputChange={handleInputChange} config={config} errors={errors} />;
      case 2:
        return <WizardPage2 userData={userData} handleInputChange={handleInputChange} config={config} errors={errors} />;
      case 3:
        return <WizardPage3 userData={userData} handleInputChange={handleInputChange} config={config} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.progressBarContainer}>
        {Object.keys(config).map((step, index) => (
          <div
            key={index}
            style={{
              ...styles.step,
              backgroundColor: page === index + 1 ? '#4CAF50' : '#ddd',
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <h2 style={styles.title}>User Onboarding</h2>
      <form onSubmit={handleSubmit}>
        {renderPageContent()}

        <div style={styles.buttons}>
          <button type="button" onClick={handlePrevPage} style={styles.button}>
            Previous
          </button>
          {page === Object.keys(config).length ? (
            <button type="submit" style={styles.button}>
              Submit
            </button>
          ) : (
            <button type="button" onClick={handleNextPage} style={styles.button}>
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  progressBarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  step: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    width: '100%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
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

export default WizardPages;

  
  