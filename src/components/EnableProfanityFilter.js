import React, { Component } from 'react';

class EnableProfanityFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optsYes: {},
      optsNo: {}
    };
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
    const labelRadioYesNo = this.props.enableprofanityfilter === 1 ?  document.getElementById("label-radio-yes") : document.getElementById("label-radio-no");
    if(this.props.global_consoleDebug){
      console.log("EnableProfanityFilter: addClassToRadioYesNo(): labelRadioYesNo: ",labelRadioYesNo);
    }
    if(labelRadioYesNo){
      labelRadioYesNo.classList.add("is-checked");
      window.componentHandler.upgradeDom();
    }
  }
  render() {
    const id1 = "radio-yes";
    const id2 = "radio-no";
    const enableprofanityfilter = this.props.enableprofanityfilter;
    let optsYes = {};
    let optsNo = {};
    if(enableprofanityfilter === 1) {
      optsYes['checked'] = "checked";
    }
    if(enableprofanityfilter === 0) {
      optsNo['checked'] = "checked";
    }
    if(this.props.global_consoleDebug){
      console.log('EnableProfanityFilter: render(): optsYes: ', optsYes,' optsNo: ',optsNo);
    }
    return (
      <p className="radio-container">
        <label id="label-radio-yes" className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={id1}>
          <input type="radio" id={id1} className="mdl-radio__button" name="radio-yes-no" value="1" onChange={this.props.toggleEnableprofanityfilter.bind(this,1)} {...optsYes} />
          <span className="mdl-radio__label">Yes</span>
        </label>
        <label id="label-radio-no" className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={id2}>
          <input type="radio" id={id2} className="mdl-radio__button" name="radio-yes-no" value="0" onChange={this.props.toggleEnableprofanityfilter.bind(this,0)} {...optsNo} />
          <span className="mdl-radio__label">No</span>
        </label>
      </p>
    )
  }
}

export default EnableProfanityFilter;