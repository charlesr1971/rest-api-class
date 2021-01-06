import React, { Component } from 'react';
import Header from "./components/Header";

import {
  BrowserRouter as Router,
} from "react-router-dom";

import './App.css';

const global_height = 55;
const global_consoleDebug = false;
const global_enableProfanityFilter = 0;

const global_restapiEndpointInsecure = document.domain === "localhost" ? "http://localhost:8500/react/react-router-es6/assets/cfm/rest/api/v1/index.cfm" : "http://playground.application.me.uk/react-router-es6/assets/cfm/rest/api/v1/index.cfm";
const global_restapiEndpointSecure = document.domain === "localhost" ? "http://localhost:8500/react/react-router-es6/assets/cfm/rest/api/v1/index.cfm" : "https://community.establishmindfulness.com/assets-react_es6_restapi/cfm/rest/api/v1/index.cfm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      global_height: global_height,
      global_consoleDebug: global_consoleDebug,
      global_enableProfanityFilter: global_enableProfanityFilter,
      global_restapiEndpointInsecure: global_restapiEndpointInsecure,
      global_restapiEndpointSecure: global_restapiEndpointSecure
    };
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Header global_height={this.state.global_height} global_consoleDebug={this.state.global_consoleDebug}  global_enableProfanityFilter={this.state.global_enableProfanityFilter}  global_restapiEndpointInsecure={this.state.global_restapiEndpointInsecure}  global_restapiEndpointSecure={this.state.global_restapiEndpointSecure} />
        </div>
      </Router>
    );
  }
}

export default App;
