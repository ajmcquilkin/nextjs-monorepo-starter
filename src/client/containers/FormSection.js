import React from 'react';
import '../styles/FormSection.scss';

const FormSection = ({ title, children }) => (
  <section className="form-section-container">
    <h2>{title}</h2>
    <div className="form-section-children-container">{children}</div>
  </section>
);

export default FormSection;
