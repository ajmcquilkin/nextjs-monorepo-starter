import { useState } from 'react';
import styles from './rejectionModal.module.scss';

export interface RejectionModalProps {

}

const RejectionModal = (): JSX.Element => {
  const [reason, setReason] = useState<string>('guidelines');
  const [comment, setComment] = useState<string>('');

  return (
    <div className={styles.rejectionModalContainer}>
      <div className={styles.rationaleSelector}>
        <p>Reason for Rejection</p>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value="guidelines">Guidelines</option>
          <option value="errors">Errors</option>
          <option value="event">Event</option>
          <option value="subject">Subject</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.commentContainer}>
        <p>Comments</p>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
    </div>
  );
};

export default RejectionModal;
