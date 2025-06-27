import React from 'react';

const TextArea = ({ label, name, value, onChange, required }) => {
  return (
    <div>
      <label>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px', height: '100px' }}
      />
    </div>
  );
};

export default TextArea;
