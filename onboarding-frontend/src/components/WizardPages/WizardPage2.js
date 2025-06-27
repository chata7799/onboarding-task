import React from 'react';
import TextInput from '../../InputComponents/TextInput';
import DateInput from '../../InputComponents/DateInput';

const WizardPage2 = ({ userData, handleInputChange, config, errors }) => {
  return (
    <div>
      {config.page2.includes('address') && (
        <>
          <h3>Address</h3>
          <TextInput label="Street Address" name="street" value={userData.address.street} onChange={handleInputChange} required />
          <TextInput label="City" name="city" value={userData.address.city} onChange={handleInputChange} required />
          <TextInput label="State" name="state" value={userData.address.state} onChange={handleInputChange} required />
          <TextInput label="Zip" name="zip" value={userData.address.zip} onChange={handleInputChange} required />
          {errors.address && <div style={{ color: 'red', textAlign:'center' }}>{errors.address}</div>}
        </>
      )}

      {config.page2.includes('birthdate') && (
        <>
          <h3>Birthdate</h3>
          <DateInput label="Birthdate" name="birthdate" value={userData.birthdate} onChange={handleInputChange} />
        </>
      )}
    </div>
  );
};

export default WizardPage2;
