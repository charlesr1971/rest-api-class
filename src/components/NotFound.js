import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  NavLink,
} from "react-router-dom";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default NotFound;