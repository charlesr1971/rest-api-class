import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props);
    if(this.props.global_consoleDebug){
      console.log('Pagination: constructor(): this.props:', this.props);
    }
  }
  render() {
    const page = this.props.page;
    const pageMax = parseInt(this.props.maxpostpage + 1);
    let ordinal = this.props.ordinal;
    if(this.props.global_consoleDebug){
      console.log('Pagination: render(): pageMax:', pageMax,' this.props.page: ',this.props.page,' this.props.ordinal: ',this.props.ordinal);
    }
    let optsClassName = {};
    if(this.props.page >= pageMax && this.props.maxpostpage == this.props.ordinal) {
      optsClassName['className'] = "max";
      ordinal = page;
    }
    else{
      if(page == this.props.ordinal) {
        optsClassName['className'] = "current";
      }
    }
    let defaultStyle = {
      display: "inline-block"
    };
    if(this.props.pages > this.props.maxpostpage && this.props.ordinal > this.props.maxpostpage) {
      defaultStyle = {
        display: "none"
      };
    }
    if(this.props.global_consoleDebug){
      console.log('Pagination: render(): optsClassName: ', optsClassName);
    }
    return (
      <span style={defaultStyle} {...optsClassName}>
        <span onClick={this.props.readPost}>{ordinal}</span>
      </span>
    )
  }
}

export default Pagination;