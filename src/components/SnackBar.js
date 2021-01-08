import React, { Component } from 'react';
import { Snackbar } from 'react-mdl';

class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
    this.handleClickActionSnackbar = this.handleClickActionSnackbar.bind(this);
    this.state = { 
      isSnackbarActive: false,
      snackbarTimeout: 2750,
      snackbarMessage: ""
    };
  }
  componentDidMount() { 
    setTimeout(function(){
      this.setState({ 
        isSnackbarActive: this.props.isSnackbarActive,
        snackbarTimeout: this.props.snackbarTimeout,
        snackbarMessage: this.props.snackbarMessage
      },function(){
        //if(this.props.global_consoleDebug){
          console.log("SnackBar: componentDidMount(): this.state.isSnackbarActive: ",this.state.isSnackbarActive," this.state.snackbarTimeout: ",this.state.snackbarTimeout," this.state.snackbarMessage: ",this.state.snackbarMessage);
        //}
      });
    }.bind(this),1000);
  }
  handleTimeoutSnackbar() {
    this.setState({ 
      isSnackbarActive: false
    });
  }
  handleClickActionSnackbar() {
    this.setState({
      isSnackbarActive: false
    });
  }
  render() {
    const isSnackbarActive  = this.state.isSnackbarActive;
    const snackbarTimeout = this.state.snackbarTimeout;
    const snackbarMessage = this.state.snackbarMessage;
    return (
      <Snackbar
        active={isSnackbarActive}
        onClick={this.handleClickActionSnackbar}
        onTimeout={this.handleTimeoutSnackbar} 
        timeout={snackbarTimeout}
        action="Close">{snackbarMessage}</Snackbar>
    );
  }
}

export default SnackBar;