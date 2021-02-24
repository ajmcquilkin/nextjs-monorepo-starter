import { createElement } from 'react';
import { Group } from 'types/group';

import styles from './formGroup.module.scss';

export interface FormGroupProps {
  group: Group,
  headerDepth: number,
  selectedElements: Record<string, boolean>,
  setSelectedState: (groupName: string, selectedState: boolean) => void
}

const FormGroup = ({
  group, headerDepth, selectedElements, setSelectedState
}: FormGroupProps): JSX.Element => (
  <div className={styles.formGroupContainer}>
    {createElement(`h${headerDepth}`, { className: styles.header }, group.name)}
    <ul>
      <div className={styles.groupListContainer}>
        {group?.list?.map((g) => (typeof g === 'string'
          ? (
            <li key={g}>
              <input
                type="checkbox"
                value={g}
                checked={!!selectedElements[g]}
                onChange={() => setSelectedState(g, !selectedElements[g])}
              />
              <p>{g}</p>
            </li>
          )
          : (
            <li key={g.name}>
              <FormGroup
                group={g}
                headerDepth={headerDepth < 6 ? headerDepth + 1 : 6}
                selectedElements={selectedElements}
                setSelectedState={setSelectedState}
              />
            </li>
          )
        ))}
      </div>
    </ul>
  </div>
);

export default FormGroup;