import React, { Component } from 'react';
import { RadioGroup, Radio } from 'react-mdl';

class Endpoint extends Component {
  constructor(props) {
    super(props);
    if(this.props.global_consoleDebug){
      console.log('Endpoint: constructor(): this.props:', this.props);
    }
  }
  componentDidUpdate() {
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
    setTimeout(function(){
      //this.addClassToRadioSecureInsecure();
    }.bind(this),0);
  }
  addClassToRadioSecureInsecure() {
    const radioSecureInsecure = this.props.restapiEndpointType === "secure" ?  document.getElementById("radio-secure").parentElement : document.getElementById("radio-insecure").parentElement;
    if(this.props.global_consoleDebug){
      console.log("Endpoint: addClassToRadioSecureInsecure(): radioSecureInsecure: ",radioSecureInsecure);
    }
    if(radioSecureInsecure){
      radioSecureInsecure.classList.add("is-checked");
      window.componentHandler.upgradeDom();
    }
  }
  render() {
    const restapiEndpointType = this.props.restapiEndpointType;
    if(this.props.global_consoleDebug){
      console.log("Endpoint: render(): restapiEndpointType: ",restapiEndpointType);
    }
    return (
      <p className="radio-container">
        <RadioGroup name="radio-secure-insecure" value={this.props.restapiEndpointType}>
            <Radio 
            value="secure" 
            ripple 
            onClick={this.props.toggleEndpoints.bind(this,"secure")}
            >
              Secure, slow endpoint
            </Radio>
            <Radio 
            value="insecure" 
            ripple 
            onClick={this.props.toggleEndpoints.bind(this,"insecure")}
            >
              Insecure, fast endpoint<br />
              <span>This may cause UX issues, depending on which device/browser is being used.</span><br />
              <span><strong>codepen.io does not allow connections to insecure resources</strong></span>
            </Radio>
        </RadioGroup>
      </p>
    )
  }
}

export default Endpoint;