import React from 'react';
import '../styles/submission.scss';
import { NavLink } from 'react-router-dom';

function Submission({ item }) {
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
  return (
    <div className="submission" style={colorKey}>
      <div className="content">
        <NavLink to={`/form/${item._id}`}>
          <h3>{item.brief_content}</h3>
        </NavLink>
        <p>{item.full_content}</p>
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
        </b>
      </div>
    </div>
  );
}

export default Submission;
