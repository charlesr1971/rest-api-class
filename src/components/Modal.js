import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from 'react-mdl';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpenDialog: false,
      modalTitle: "",
      modalMessage: "",
      modalButtonTitle: "",
      modalCallback: 1
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    //if(this.props.global_consoleDebug){
      console.log("Modal: constructor(): this.state: ",this.state);
    //}
  }
  componentDidMount() { 
    setTimeout(function(){
      this.setState({ 
        modalOpenDialog: this.props.modalOpenDialog,
        modalTitle: this.props.modalTitle,
        modalMessage: this.props.modalMessage,
        modalButtonTitle: this.props.modalButtonTitle,
        modalCallback: this.props.modalCallback,
      },function(){
        //if(this.props.global_consoleDebug){
          console.log("Modal: componentDidMount(): this.state: ",this.state);
        //}
      });
    }.bind(this),1000);
    window.componentHandler.upgradeDom();
  }
  handleOpenDialog() {
    this.setState({
      modalOpenDialog: true
    });
  }
  handleCloseDialog() {
    this.setState({
      modalOpenDialog: false
    });
  }
  render() {
    const modalOpenDialog  = this.state.modalOpenDialog;
    const modalTitle = this.state.modalTitle;
    const modalMessage = this.state.modalMessage;
    const modalButtonTitle = this.state.modalButtonTitle;
    const modalCallback = this.state.modalCallback;
    const button = modalButtonTitle.trim() !== "" ? (<Button type='button'>{modalButtonTitle}</Button>) : ("") ;
    return (
      <Dialog open={modalOpenDialog}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <p>{modalMessage}</p>
        </DialogContent>
        <DialogActions>
          {button}
          <Button type='button' onClick={this.handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Modal;