import React from 'react';
import sanitizeHtml from 'sanitize-html';

import '../styles/compile.scss';
import '../styles/submission.scss';
import '../styles/CompileItem.scss';

const CompileItem = ({ item }) => {
  const [expanded, setExpanded] = React.useState(false);
  const cleanHTML = sanitizeHtml(item.full_content);

  return (
    <div className="compile-item-container">
      <div className="compile-item-header-container">
        <h3>{item.brief_content}</h3>
        {/* TODO: Add sender, send lists */}
        <button type="button" onClick={() => setExpanded(!expanded)}>{expanded ? 'show less' : 'show more'}</button>
      </div>

      { expanded ? (
        <div className="compile-expanded-container">
          <div className="compile-item-content-container">
            <h3>{item.brief_content}</h3>
            <div className="compile-item-main-content-container">
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
              <img src="" alt="TEST LOCATION" />
            </div>
          </div>

          <div className="compile-item-footer-container">
            <a target="_blank" rel="noreferrer" href={item.url.startsWith('http') ? item.url : `http://${item.url}`}>{item.url}</a>
            <div className="compile-items-footer-button-container">
              <button
                className="compile-edit-button"
                type="button"
                onClick={() => window.open(`/form/${item._id}`)}
              >
                Edit
              </button>

              <button className="compile-delete-button" type="button">
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null }
    </div>
  );
};

export default CompileItem;
