import { ReactNode } from 'react';
import styles from './formSection.module.scss';

export interface FormSectionProps {
  title: string,
  children: ReactNode,
}

const FormSection = ({ title, children }: FormSectionProps): JSX.Element => (
  <section className={styles.formSectionContainer}>
    <h2>{title}</h2>
    <div className={styles.formSectionChildrenContainer}>{children}</div>
  </section>
);

export default FormSection;
