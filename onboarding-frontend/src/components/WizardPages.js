import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AdminContext } from './AdminContext'; // Admin config context
import axios from 'axios';

const WizardPages = () => {
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({
    email:'',    
    firstName: '',
    lastName: '',
    address: { street: '', city: '', state: '', zip: '' }, // Address is now an object
    birthdate: '', // Added birthdate to userData
    aboutMe: '',
  });

  const { config } = useContext(AdminContext); // Admin config context
  console.log("configgg",config)
  const navigate = useNavigate(); // Initialize navigate

  const handleNextPage = () => {
    if (page < 3) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input name is inside the address object, update the address object
    console.log("name",name,"userData",userData)
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
    // Log the user data to ensure everything is correct
    console.log("userData", userData);
    try {
      // Post user data to your backend (e.g., MongoDB)
      await axios.post('https://zealthy-db248ad65a1c.herokuapp.com/user', userData);
      alert('User data submitted successfully!');
      navigate('/data'); // Redirect to data page after submission
    } catch (error) {
      alert('Error submitting data!');
    }
  };

  return (
    <div style={styles.container}>
      {/* Step Indicator and Progress Bar */}
      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.step, backgroundColor: page === 1 ? '#4CAF50' : '#ddd' }}>1</div>
        <div style={{ ...styles.step, backgroundColor: page === 2 ? '#4CAF50' : '#ddd' }}>2</div>
        <div style={{ ...styles.step, backgroundColor: page === 3 ? '#4CAF50' : '#ddd' }}>3</div>
      </div>
      <h2 style={styles.title}>User Onboarding</h2>

      {page === 1 && (
        <div style={styles.page}>
          <h3>Basic Information</h3>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
      )}

      {page === 2 && (
        <div style={styles.page}>
          
          {config.page2.includes('address') && (
            <>
            <h3>Address</h3>
              <input
                type="text"
                placeholder="Street Address"
                name="street"
                value={userData.address.street}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="City"
                name="city"
                value={userData.address.city}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="State"
                name="state"
                value={userData.address.state}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Zip"
                name="zip"
                value={userData.address.zip}
                onChange={handleInputChange}
                style={styles.input}
              />
            </>
          )}
           
          {config.page2.includes('birthdate') && (
            <>
            <h3>Date Of Birth</h3>
            <input
              type="date"
              placeholder="Birthdate"
              name="birthdate"
              value={userData.birthdate}
              onChange={handleInputChange}
              style={styles.input}
            />
            </>
          )}
        </div>
      )}

      {page === 3 && (
        <div style={styles.page}>
          <h3>About Me</h3>
          {config.page3.includes('aboutMe') && (
            <textarea
              placeholder="Tell us about yourself"
              name="aboutMe"
              value={userData.aboutMe}
              onChange={handleInputChange}
              style={styles.input}
            />
          )}
        </div>
      )}

      <div style={styles.buttons}>
        <button type="button" onClick={handlePrevPage} style={styles.button}>
          Previous
        </button>
        {page === 3 ? (
          <button type="button" onClick={handleSubmit} style={styles.button}>
            Submit
          </button>
        ) : (
          <button type="button" onClick={handleNextPage} style={styles.button}>
            Next
          </button>
        )}
      </div>
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
  page: {
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


  
  