import React from 'react';

const FormSection = ({ title, children }) => (
  <div className="form-section-container">
    <h2>{title}</h2>
    <div className="form-section">
      {children}
    </div>
  </div>
);

export default FormSection;
