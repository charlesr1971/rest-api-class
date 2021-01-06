import React, { Component } from 'react';

class Endpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optsSecure: {},
      optsInsecure: {}
    };
    if(this.props.global_consoleDebug){
      console.log('Endpoint: constructor(): this.props:', this.props);
    }
  }
  componentDidUpdate() {
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
    setTimeout(function(){
      this.addClassToRadioSecureInsecure();
    }.bind(this),0);
  }
  addClassToRadioSecureInsecure() {
    const labelRadioSecureInsecure = this.props.restapiEndpointType === "secure" ?  document.getElementById("label-radio-secure") : document.getElementById("label-radio-insecure");
    if(this.props.global_consoleDebug){
      console.log("Endpoint: addClassToRadioSecureInsecure(): labelRadioSecureInsecure: ",labelRadioSecureInsecure);
    }
    if(labelRadioSecureInsecure){
      labelRadioSecureInsecure.classList.add("is-checked");
      window.componentHandler.upgradeDom();
    }
  }
  render() {
    const id1 = "radio-secure";
    const id2 = "radio-insecure";
    const restapiEndpointType = this.props.restapiEndpointType;
    let optsSecure = {};
    let optsInsecure = {};
    if(restapiEndpointType === "secure") {
      optsSecure['checked'] = "checked";
    }
    if(restapiEndpointType === "insecure") {
      optsInsecure['checked'] = "checked";
    }
    if(this.props.global_consoleDebug){
      console.log('Endpoint: render(): optsSecure: ', optsSecure,' optsInsecure: ',optsInsecure);
    }
    return (
      <p className="radio-container">
        <label id="label-radio-secure" className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={id1}>
          <input type="radio" id={id1} className="mdl-radio__button" name="radio-secure-insecure" value="secure" onChange={this.props.toggleEndpoints.bind(this,"secure")} {...optsSecure} />
          <span className="mdl-radio__label">Secure, slow endpoint</span>
        </label>
        <label id="label-radio-insecure" className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={id2}>
          <input type="radio" id={id2} className="mdl-radio__button" name="radio-secure-insecure" value="insecure" onChange={this.props.toggleEndpoints.bind(this,"insecure")} {...optsInsecure} />
          <span className="mdl-radio__label">Insecure, fast endpoint.<br /><span>This may cause UX issues, depending on which device/browser is being used.</span><br /><span><strong>codepen.io does not allow connections to insecure resources</strong></span></span>
        </label>
      </p>
    )
  }
}

export default Endpoint;