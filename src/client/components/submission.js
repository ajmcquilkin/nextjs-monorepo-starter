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

  return (
    <div className="submission-container" style={{ borderLeftColor: color(item.status) }}>
      <div className="submission-content-container">
        <h3>{item.brief_content}</h3>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        <a href={item.url}>{item.url}</a>
      </div>

      <div className="submission-control-container">
        <p>
          {type}
          {' '}
          &middot; Status:
          {' '}
          <b style={{ color: color(item.status) }}>
            {' '}
            {item.status}
          </b>
        </p>

        <div className="submission-control-button-container">
          <button type="button" onClick={deleteItem}>Delete</button>
          <button type="button" onClick={duplicate}>Duplicate</button>
          <NavLink to={`/form/${item._id}`}>Edit</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Submission;
