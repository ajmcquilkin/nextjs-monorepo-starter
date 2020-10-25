import React from 'react';
import '../styles/webviewItem.scss';
import sanitizeHtml from 'sanitize-html';

const WebviewItem = (props) => {
  const cleanHTML = sanitizeHtml(props.item.full_content);
  console.table(props.item);

  return (
    <div className="item">
      <div className="item-title">
        <h4>{props.item.brief_content}</h4>
      </div>

      {
        props.item.type === 'announcement'
          ? (
            <h5>
              {props.item.from_name}
              {' '}
              {props.item.from_address}
            </h5>
          )
          : null
      }

      <div className="item-content">
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
      </div>

    </div>
  );
};

export default WebviewItem;
