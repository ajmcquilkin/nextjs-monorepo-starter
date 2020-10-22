import React from 'react';
import './styles.scss';

function Submission(props) {
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

  const colorKey = { borderLeftColor: color(props.submStatus) };

  return (
    <div className="submission" style={colorKey}>
      <div className="content">
        <h3>HR Workshop on Making Friends with Coworkers</h3>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p>Come learn how to befriend your colleagues so you don't have to sit in the faculty lunch room alone!</p>
        <a href="https://home.dartmouth.edu/">https://home.dartmouth.edu/</a>
      </div>
    </div>
  );
}

export default Submission;
