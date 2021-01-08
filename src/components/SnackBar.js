import React, { Component } from 'react';
import { Snackbar, Button } from 'react-mdl';

class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    this.handleClickActionSnackbar = this.handleClickActionSnackbar.bind(this);
    this.state = { 
      isSnackbarActive: false,
      btnBgColor: ""
    };
  }
  handleShowSnackbar() {
    this.setState({
      isSnackbarActive: true,
      btnBgColor: '#' +
        Math.floor(Math.random() * 0xFFFFFF).toString(16)
    });
  }
  handleTimeoutSnackbar() {
    this.setState({ isSnackbarActive: false });
  }
  handleClickActionSnackbar() {
    this.setState({
      btnBgColor: "",
      isSnackbarActive: false
    });
  }
  render() {
    const { btnBgColor, isSnackbarActive } = this.state;
    return (
      <Snackbar
        active={isSnackbarActive}
        onClick={this.handleClickActionSnackbar}
        onTimeout={this.handleTimeoutSnackbar}
        action="Close">{this.props.message}</Snackbar>
    );
  }
}

export default SnackBar;