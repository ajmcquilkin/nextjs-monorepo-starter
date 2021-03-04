/* eslint-disable jsx-a11y/label-has-associated-control */

import styles from './radioSelector.module.scss';

export interface RadioSelectorProps {
  name: string,
  value: string,
  label: string,
  isChecked: boolean,
  onClick: () => void,

  className?: string
}

const RadioSelector = ({
  name, value, label, isChecked,
  onClick, className = ''
}: RadioSelectorProps): JSX.Element => (
  <label className={[styles.radioSelectorContainer, className].join(' ')}>
    <input
      type="radio"
      name={name}
      value={value}
      checked={isChecked}
      onChange={() => onClick()}
    />
    <span className={styles.radioSelector} />
    <p>{label}</p>
  </label>
);

export default RadioSelector;
