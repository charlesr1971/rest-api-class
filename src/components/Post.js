import React, { Component } from 'react';
import { Card, CardText, CardTitle, CardActions, CardMenu, IconButton  } from 'react-mdl';

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
    let optsClassName1 = {};
    optsClassName1['className'] = "demo-card-wide";
    let optsClassName2 = {};
    optsClassName2['className'] = "post";
    return (
      <Card shadow={0} {...optsClassName1} style={defaultStyle1}>
        <CardTitle {...optsClassName2}>
          <h2 className="mdl-card__title-text">{this.props.title}</h2>
        </CardTitle>
        <CardText>
          {this.props.createdAt}
          <i className="fa fa-trash" onClick={this.props.removeTodo}></i>
        </CardText>
        <CardActions border>
          <div className="todo-container" style={defaultStyle2}>
            {this.props.content}
          </div>
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
          <IconButton name="share" />
        </CardMenu>
      </Card>
    );
  }
}

export default Post;