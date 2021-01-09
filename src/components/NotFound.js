import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect} from "react-router-dom";

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