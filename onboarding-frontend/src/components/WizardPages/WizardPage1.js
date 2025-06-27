import React from 'react';
import TextInput from '../../InputComponents/TextInput';

const WizardPage1 = ({ userData, handleInputChange, errors,config }) => {
  return (
    <div>
        {config.page1.includes('email') && (
        <>
          <TextInput label="Email Address" name="email" value={userData.email} onChange={handleInputChange} required />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </>
      )}
       {config.page1.includes('password') && (
        <>
          <TextInput label="Password" name="password" type="password" value={userData.password} onChange={handleInputChange} required />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </>
      )}
       {config.page1.includes('firstName') && (
        <>
          <TextInput label="First Name" name="firstName" value={userData.firstName} onChange={handleInputChange} required />
          {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
        </>
      )}
       {config.page1.includes('lastName') && (
        <>
          <TextInput label="Last Name" name="lastName" value={userData.lastName} onChange={handleInputChange} required />
          {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
        </>
      )}
      
      
      
      
      
      
      
    </div>
  );
};

export default WizardPage1;
