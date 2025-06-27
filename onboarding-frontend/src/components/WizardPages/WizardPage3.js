import React from 'react';
import TextArea from '../../InputComponents/TextArea';

const WizardPage3 = ({ userData, handleInputChange, config }) => {
  return (
    <div>
      {config.page3.includes('aboutMe') && (
        <>
          <h3>About Me</h3>
          <TextArea label="Tell us about yourself" name="aboutMe" value={userData.aboutMe} onChange={handleInputChange} required />
        </>
      )}
    </div>
  );
};

export default WizardPage3;
