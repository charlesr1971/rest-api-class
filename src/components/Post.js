import React, { Component } from 'react';

class Post extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
  }
  render() {
    const display = this.props.id1 == this.props.id2 ? "block" : "none";
    const defaultStyle1 = {
      display: display
    };
    const defaultStyle2 = {
      padding: "20px"
    };
    return (
      <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={defaultStyle1}>
        <div className="mdl-card__title post">
          <h2 className="mdl-card__title-text">{this.props.title}</h2>
        </div>
        <div className="mdl-card__supporting-text">
          {this.props.createdAt}
          <i className="fa fa-trash" onClick={this.props.removeTodo}></i>
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <div className="todo-container" style={defaultStyle2}>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default Post;