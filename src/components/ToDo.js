import React, { Component } from 'react';
import { Checkbox } from 'react-mdl';
import { BrowserRouter as Router, Link } from "react-router-dom";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.height = this.props.global_height;
    this.state = {
      top: this.height
    };
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
  }
  render() {
    let defaultClass = "callout display-enter-active";
    defaultClass += this.props.done ? " callout-success" : " callout-info";
    const id1 = "callout-" + this.props.keyRef;
    const id2 = "checkbox-" + this.props.keyRef;
    const defaultStyle = {
      top: this.props.keyRef * this.state.top + "px"
    };
    const link = "/post/" + this.props.slug;
    return (
      <div className={defaultClass} style={defaultStyle} id={id1}>
        <i
          className="fa fa-arrow-circle-o-up"
          onClick={this.props.moveUp}
        ></i>
        <i
          className="fa fa-arrow-circle-o-down"
          onClick={this.props.moveDown}
        ></i>
        <Link to={{
          pathname: link,
          state: {
            id: this.props.keyRef,
            slug: this.props.slug,
            title: this.props.title,
            content: this.props.content,
            done: true,
            createdAt: this.props.createdAt,
            postid: this.props.postid
          }
        }}>
          <i className="fa fa-link"></i>
        </Link>
        <Checkbox 
          id={id2} 
          label={this.props.title} 
          onChange={this.props.removeTodo} 
          ripple 
          checked
         />
        <div className="createdat-container">{this.props.createdAt}</div>
      </div>
    );
  }
}

export default ToDo;