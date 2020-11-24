import React from 'react';
import '../styles/FormSection.scss';

const FormSection = ({ title, children }) => (
  <div className="form-section-container">
    <h2>{title}</h2>
    <div className="form-section-children-container">{children}</div>
  </div>
);

export default FormSection;
