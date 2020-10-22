import React from 'react';
import Submission from '../components/submission';

function Dashboard() {
  return (
    <div>
      <Submission submStatus="pending" />
      <Submission submStatus="approved" />
      <Submission submStatus="draft" />
    </div>
  );
}

export default Dashboard;
