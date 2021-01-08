import React from 'react';
import { NavLink } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

import '../styles/submission.scss';

function Submission({ deleteItem, item, duplicate }) {
  function color(submStatus) {
    switch (submStatus) {
      case 'draft':
        return '#7c7e80';
      case 'pending':
        return '#8a6996';
      case 'rejected':
        return '#E32D1C';
      case 'approved':
        return '#267ABA';
      case 'published':
        return '#424141';
      default:
        return null;
    }
  }

  const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);
  const cleanHTML = sanitizeHtml(item.full_content);
  const editable = item.status === 'draft' || item.status === 'pending' || item.status === 'rejected';

  return (
    <div className="submission-container" style={{ borderLeftColor: color(item.status) }}>
      <div className="submission-content-container">
        <h3>{item.brief_content}</h3>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        <a target="_blank" rel="noreferrer" href={item.url.startsWith('http') ? item.url : `http://${item.url}`}>{item.url}</a>
      </div>

      <div className="submission-control-container">
        <p>
          {type}
          {' '}
          &middot; Status:
          {' '}
          <b style={{ color: color(item.status) }}>
            {' '}
            <span style={{ color: color(item.status) }}>
              {' '}
              {item.status}
            </span>
          </b>
        </p>
        <div className="submission-control-button-container">
          {editable && <button type="button" onClick={deleteItem}>Delete</button>}
          <button type="button" onClick={duplicate}>Duplicate</button>
          {editable && (
          <NavLink to={`/form/${item._id}`}>
            <button type="button">Edit</button>
          </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Submission;
