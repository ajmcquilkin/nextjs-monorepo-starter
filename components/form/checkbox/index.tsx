/* eslint-disable jsx-a11y/label-has-associated-control */

import styles from './checkbox.module.scss';

export interface CheckboxProps {
  isChecked: boolean,
  value: string,
  onCheck: () => void,

  className?: string
}

const Checkbox = ({
  isChecked, value, onCheck, className = ''
}: CheckboxProps): JSX.Element => (
  <label className={[styles.checkboxContainer, className].join(' ')}>
    <input
      type="checkbox"
      value={value}
      checked={isChecked}
      onChange={() => onCheck()}
    />
    <span className={styles.checkmark} />
    <p>{value}</p>
  </label>
);

export default Checkbox;
