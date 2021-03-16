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
  <label className={[styles.checkboxContainer, 'small', className].join(' ')}>
    {value}

    <input
      type="checkbox"
      value={value}
      checked={isChecked}
      onChange={() => onCheck()}
    />
    <span className={styles.checkmark} />
  </label>
);

export default Checkbox;
