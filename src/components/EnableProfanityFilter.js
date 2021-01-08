import React, { Component } from 'react';
import { RadioGroup, Radio } from 'react-mdl';

class EnableProfanityFilter extends Component {
  constructor(props) {
    super(props);
    if(this.props.global_consoleDebug){
      console.log('EnableProfanityFilter: constructor(): this.props:', this.props);
    }
  }
  componentDidUpdate() {
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
    setTimeout(function(){
      this.addClassToRadioYesNo();
    }.bind(this),0);
  }
  addClassToRadioYesNo() {
    const labelRadioYesNo = this.props.enableprofanityfilter === 1 ?  document.getElementById("radio-yes").parentElement : document.getElementById("radio-no").parentElement;
    if(this.props.global_consoleDebug){
      console.log("EnableProfanityFilter: addClassToRadioYesNo(): labelRadioYesNo: ",labelRadioYesNo);
    }
    if(labelRadioYesNo){
      labelRadioYesNo.classList.add("is-checked");
      window.componentHandler.upgradeDom();
    }
  }
  render() {
    const enableprofanityfilter = this.props.enableprofanityfilter;
    if(this.props.global_consoleDebug){
      console.log("EnableProfanityFilter: render(): enableprofanityfilter: ",enableprofanityfilter);
    }
    return (
      <p className="radio-container">
        <RadioGroup name="radio-yes-no" value={enableprofanityfilter}>
            <Radio 
            id="radio-yes" 
            value="1" 
            ripple 
            onClick={this.props.toggleEnableprofanityfilter.bind(this,1)}
            >
              Yes
            </Radio>
            <Radio 
            id="radio-no" 
            value="0" 
            ripple 
            onClick={this.props.toggleEnableprofanityfilter.bind(this,0)}
            >
              No
            </Radio>
        </RadioGroup>
      </p>
    )
  }
}

export default EnableProfanityFilter;