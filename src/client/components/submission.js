import React from 'react';
import '../styles/submission.scss';
import { NavLink } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

function Submission({ deleteItem, item, duplicate }) {
  function color(submStatus) {
    switch (submStatus) {
      case 'pending':
        return '#FF9B03';
      case 'draft':
        return '#E32D1C';
      case 'approved':
        return '#267ABA';
      case 'published':
        return '#424141';
      default:
        return null;
    }
  }

  const colorKey = { borderLeftColor: color(item.status) };
  const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);

  const cleanHTML = sanitizeHtml(item.full_content);
  return (
    <div className="submission" style={colorKey}>
      <div className="content">
        <h3>{item.brief_content}</h3>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        <a href={item.url}>{item.url}</a>
      </div>
      <div className="control">
        <b>
          <p>
            {type}
            {' '}
            &middot; Status:
            {' '}
            <span style={{ color: color(item.status) }}>
              {' '}
              {item.status}
            </span>
          </p>
          <button type="button" onClick={deleteItem}>Delete</button>
          <button type="button" onClick={duplicate}>Duplicate</button>
          <NavLink to={`/form/${item._id}`}>
            <button type="button">Edit</button>
          </NavLink>

        </b>
      </div>
    </div>
  );
}

export default Submission;
