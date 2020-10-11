import React from 'react';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import {
  DraftailEditor,
  BLOCK_TYPE,
  INLINE_STYLE,
  ENTITY_TYPE
} from 'draftail';

function MyEditor() {
  const initial = JSON.parse(sessionStorage.getItem('draftail:content'));

  const blockTypes = [{ type: BLOCK_TYPE.UNORDERED_LIST_ITEM }];
  const inlineStyles = [
    { type: INLINE_STYLE.BOLD },
    { type: INLINE_STYLE.ITALIC },
    { type: INLINE_STYLE.UNDERLINE }
  ];
  const entityTypes = [
    { type: ENTITY_TYPE.LINK },
    { type: ENTITY_TYPE.IMAGE }
  ];

  const onSave = (content) => {
    console.log('saving', content);
    sessionStorage.setItem('draftail:content', JSON.stringify(content));
  };

  return (
    <DraftailEditor
      rawContentState={initial || null}
      onSave={onSave}
      blockTypes={blockTypes}
      inlineStyles={inlineStyles}
      entityTypes={entityTypes}
    />
  );
}

export default MyEditor;
