import React from 'react';
import WebviewItem from '../components/webviewItem';
import '../styles/itemSection.scss';

const ItemSection = ({ title, subtitle, itemList = [] }) => (
  <div className="item-section-container">
    <div className="section-bar" />

    <div className="item-section-title-container">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>

    <div className="item-section-results-container">
      {itemList.map((item) => <WebviewItem item={item} />)}
    </div>
  </div>
);

export default ItemSection;
