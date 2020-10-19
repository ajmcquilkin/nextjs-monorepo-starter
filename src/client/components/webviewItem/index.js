import React from 'react';
import './styles.scss';
import { NavLink } from 'react-router-dom';

const WebviewItem = (props) => (
  <div className="item">
    <NavLink to={`/items/${props.item._id}`}>

      <h4>{props.item.brief_content}</h4>

    </NavLink>

    <h5>
      {props.item.from_name}
      {' '}
      {props.item.from_address}
    </h5>

    <p>
      {props.item.full_content.substring(0, 300)}
      {' '}
      ...
    </p>
  </div>
);

export default WebviewItem;
