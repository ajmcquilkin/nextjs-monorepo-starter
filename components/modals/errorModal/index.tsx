import styles from './errorModal.module.scss';

export interface ErrorModalProps {
  content: string
}

const ErrorModal = ({ content }: ErrorModalProps): JSX.Element => (
  <div className={styles.errorModalContainer}>
    <p className={styles.errorContent}>{content}</p>
  </div>
);

export default ErrorModal;
