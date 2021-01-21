import RTE, { EditorValue } from 'react-rte';

import { maxContentLength } from 'utils';
import ContentLength from 'components/form/contentLength';

import styles from './richTextEditor.module.scss';

export interface RichTextEditorProps {
  onChange: (...args: any) => void,
  content: EditorValue,
  readOnly?: boolean
}

const RichTextEditor = ({ onChange, content, readOnly = false }: RichTextEditorProps): JSX.Element => (
  <div className={styles.rteContainer}>
    <RTE
      value={content}
      onChange={onChange}
      toolbarConfig={{
        display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'],
        INLINE_STYLE_BUTTONS: [
          { label: 'Bold', style: 'BOLD' },
          { label: 'Italic', style: 'ITALIC' },
          { label: 'Underline', style: 'UNDERLINE' }
        ],
        BLOCK_TYPE_BUTTONS: [
          { label: 'UL', style: 'unordered-list-item' }
        ],
        BLOCK_TYPE_DROPDOWN: []
      }}
      readOnly={readOnly}
      className={styles.rteEmbeddedContainer}
      toolbarClassName={styles.rteToolbarContainer}
      editorClassName={styles.rteEditorContainer}
    />

    <ContentLength
      contentLength={content.toString('html').replace(/(<([^>]+)>)/ig, '').length} // ? Better method?
      maxContentLength={maxContentLength}
      className={styles.rteCharCount}
    />
  </div>
);

export const { createEmptyValue, createValueFromString } = RTE;
export default RichTextEditor;
