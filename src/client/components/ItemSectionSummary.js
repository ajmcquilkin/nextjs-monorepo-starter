/* eslint-disable camelcase */
import React from 'react';
import '../styles/itemSectionSummary.scss';

const ItemSectionSummary = ({
  title, items, hideFrom = false, className = ''
}) => (
  <div className={`item-summary-container ${className}`}>
    <h4>{`${title} (${items.length})`}</h4>
    <ul>
      {items.map(({ brief_content, from_name }) => (
        <li>
          {brief_content}
          {from_name && !hideFrom ? ` (${from_name})` : ''}
        </li>
      ))}
    </ul>
  </div>
);

export default ItemSectionSummary;
