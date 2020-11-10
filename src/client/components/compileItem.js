import React from 'react';
import '../styles/compile.scss';
import { NavLink } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
// import { render } from 'node-sass';

class CompileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  //   toggleExpanded () => {

  //   }
  render() {
    const { item } = this.props;
    const type = item.type.charAt(0).toUpperCase() + item.type.slice(1);

    const cleanHTML = sanitizeHtml(item.full_content);
    if (this.state.expanded) {
      return (
        <div className="compile-item">
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
              </p>
              <NavLink to={`/form/${item._id}`}>
                <button type="button">Edit</button>
              </NavLink>
              <button
                type="button"
                onClick={() => this.setState((prevState) => ({ expanded: !prevState.expanded }))}
              >
                {this.state.expanded ? 'less' : 'more'}
              </button>
            </b>
          </div>
        </div>

      );
    }
    return (
      <div className="compile-item">
        <div className="content">
          <h3>{item.brief_content}</h3>
        </div>
        <div className="control">
          <b>
            <p>
              {type}
            </p>
            <NavLink to={`/form/${item._id}`}>
              <button type="button">Edit</button>
            </NavLink>
            <button
              type="button"
              onClick={() => this.setState((prevState) => ({ expanded: !prevState.expanded }))}
            >
              {this.state.expanded ? 'less' : 'more'}
            </button>
          </b>
        </div>
      </div>
    );
  }
}

export default CompileItem;
