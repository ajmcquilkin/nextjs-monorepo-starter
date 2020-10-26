import React from 'react';
import '../styles/webviewItem.scss';
import sanitizeHtml from 'sanitize-html';

const WebviewItem = ({ item }) => {
  const cleanHTML = sanitizeHtml(item.full_content);
  console.table(item);

  return (
    <div className="item">
      <div className="item-title">
        <h4>{item.brief_content}</h4>
      </div>

      {
        item.type === 'announcement'
          ? (
            <h5>
              {item.from_name}
              {' '}
              {item.from_address}
            </h5>
          )
          : null
      }

      <div className="item-padding-container">
        {/* eslint-disable-next-line react/no-danger */}
        <div className="item-content" dangerouslySetInnerHTML={{ __html: cleanHTML }} />

        <a href={item.url}>{item.url}</a>
      </div>
    </div>
  );
};

export default WebviewItem;
