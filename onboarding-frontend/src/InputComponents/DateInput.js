import React from 'react';

const DateInput = ({ label, name, value, onChange, required }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
      />
    </div>
  );
};

export default DateInput;
