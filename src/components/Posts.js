import React, { Component } from 'react';

import ToDoList from "./ToDoList";

class Posts extends Component {
  constructor(props) {
    super(props);
    if(this.props.global_consoleDebug){
      console.log("Posts: constructor(): this.props: ", this.props);
    }
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
  }
  render() {
    return <ToDoList origin="posts" posts={this.props.posts} id="" removeTodo={this.props.removeTodo} markTodoDone={this.props.markTodoDone} addTodo={this.props.addTodo} readPost={this.props.readPost} pages={this.props.pages} postCount={this.props.postCount} handleChange={this.props.handleChange} handleContentChange={this.props.handleContentChange} inputValue={this.props.inputValue} contentValue={this.props.contentValue} postCountPrev={this.props.postCountPrev} toggleEndpoints={this.props.toggleEndpoints} restapiEndpointType={this.props.restapiEndpointType} page={this.props.page} maxpostpage={this.props.maxpostpage} sortmethod={this.props.sortmethod} sortby={this.props.sortby} postbatch={this.props.postbatch} request_postbatch={this.props.request_postbatch} postbatch_select={this.props.postbatch_select} handleSelectChange={this.props.handleSelectChange} enableprofanityfilter={this.props.enableprofanityfilter} toggleEnableprofanityfilter={this.props.toggleEnableprofanityfilter} openModal={this.props.openModal} showProfanitylist={this.props.showProfanitylist} global_height={this.props.global_height} global_consoleDebug={this.props.global_consoleDebug} global_enableProfanityFilter={this.props.global_enableProfanityFilter} global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} global_restapiEndpointSecure={this.props.global_restapiEndpointSecure} />;
  }
}

export default Posts;