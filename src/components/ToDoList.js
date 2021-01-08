import React, { Component } from 'react';
import { Textfield, Button, Spinner, Card, CardText, CardTitle, CardActions, CardMenu, IconButton  } from 'react-mdl';
import { CSSPlugin, TweenMax, Elastic } from "gsap";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import ToDo from "./ToDo";
import Post from "./Post";
import Pagination from "./Pagination";
import Endpoint from "./Endpoint";
import EnableProfanityFilter from "./EnableProfanityFilter";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.height = this.props.global_height;
    this.state = {
      todos: this.props.posts,
      inputValue: this.props.inputValue,
      contentValue: this.props.contentValue,
      movementMatrix: [],
      reorderClicked: false,
      slug: "",
      redirect: false,
      postCount: this.props.postCount,
      postCountPrev: this.props.postCountPrev,
      addToDo: false,
      pages: this.props.pages,
      page: this.props.page,
      enableProfanityFilter: this.props.global_enableProfanityFilter
    };
    if(this.props.global_consoleDebug){
      console.log("ToDoList: constructor(): this.props: ", this.props);
    }
  }
  componentDidUpdate(prevProps,prevState) {
    if (this.state.reorderClicked) {
      this.state.movementMatrix.map((child, index) => {
      const domNode = document.getElementById("callout-" + child["index"]);
      // START CREDITS
      // Author: Joshua Comeau
      // Link: https://medium.com/developers-writing/animating-the-unanimatable-1346a5aab3cd
      /* 
          
        Notes: 
        
        This is where the magic happens that allows us to reorder a list based on its array index. 
        Ingenious solution, using requestAnimationFrame(). 
        This type of animation cannot be achieved by using 'react-spring' or CSSTransition
        
      */
      if (domNode) {
        requestAnimationFrame(() => {
          domNode.style.transform = `translateY(${child.top}px)`;
          domNode.style.transition = "transform 0s";
          requestAnimationFrame(() => {
            domNode.style.transform = "";
            domNode.style.transition =
            "transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)";
            this.setState({
            reorderClicked: false
            });
          });
        });
      }
      // END CREDITS
      });
    }
  }
  componentDidMount() {
    window.componentHandler.upgradeDom();
    window.componentHandler.upgradeAllRegistered();
    if(this.props.global_consoleDebug){
      console.log("ToDoList: componentDidMount()...");
    }
    setTimeout(function(){
      if(this.props.postCount != this.props.postCountPrev){
        this.animatePostCountIcon();
      }
    }.bind(this),0);
  }
  animatePostCountIcon() {
    const overshoot = 5;
    const period = 0.25;
    const postCountIcon = document.getElementById("post-count-icon");
    if(this.props.global_consoleDebug){
      console.log("ToDoList: animatePostCountIcon(): postCountIcon: ",postCountIcon);
    }
    if(postCountIcon){
      TweenMax.to(postCountIcon,0.5,{
      scale:0.25,
      onComplete:function(){
            TweenMax.to(postCountIcon,1.4,{
            scale:1,
            /* ease:Elastic.easeOut,
            easeParams:[overshoot,period] */
            //Elastic.easeOut.config(overshoot,period)
            ease:Elastic.easeOut.config(overshoot,period)
          })
        }
      });
    }
  }
  createMovementMatrix(allMoveUp, allMoveDown, index1, index2, direction) {
    const y = this.height;
    let todos = this.state.todos;
    /* 
        
      Notes:
    
      There are 3 possible movement scenarios:
    
      1) All move up: all items move up, except the first item which moves all the way to the down
    
      2) All move down: all items move down, except the last item which moves all the way to the up
    
      3) Two items swap: all items remain static except for the current index and the list item it will swap with
    
      Objective:
    
      Record the following properties of each list item:
    
      1) current index
      2) index to move to
      3) y movement
    
    */
    let movementMatrix = [];
    if (allMoveUp) {
      todos = this.state.todos;
      let obj = {};
      movementMatrix = [];
      const temp = todos.map(
      function (todo, index) {
        obj = {};
        obj["index"] = index;
        obj["indexNew"] = index - 1;
        obj["top"] = -y;
        movementMatrix.push(obj);
      }.bind(this)
      );
      obj = {};
      obj["index"] = 0;
      obj["indexNew"] = todos.length - 1;
      obj["top"] = (todos.length - 1) * y;
      movementMatrix[0] = obj;
    }
    if (allMoveDown) {
      todos = this.state.todos;
      let obj = {};
      movementMatrix = [];
      const temp = todos.map(
      function (todo, index) {
        obj = {};
        obj["index"] = index;
        obj["indexNew"] = index + 1;
        obj["top"] = y;
        movementMatrix.push(obj);
      }.bind(this)
      );
      obj = {};
      obj["index"] = todos.length - 1;
      obj["indexNew"] = 0;
      const _y = (todos.length - 1) * y;
      obj["top"] = -_y;
      movementMatrix[todos.length - 1] = obj;
    }
    if (!allMoveUp && !allMoveDown) {
      todos = this.state.todos;
      let obj = {};
      movementMatrix = [];
      const temp = todos.map(
      function (todo, index) {
        obj = {};
        obj["index"] = index;
        obj["indexNew"] = index;
        obj["top"] = 0;
        movementMatrix.push(obj);
      }.bind(this)
      );
      obj = {};
      obj["index"] = index1;
      obj["indexNew"] = direction == "up" ? index1 - 1 : index1 + 1;
      obj["top"] = direction == "up" ? -y : y;
      movementMatrix[index1] = obj;
      obj = {};
      obj["index"] = index2;
      obj["indexNew"] = direction == "up" ? index2 - 1 : index2 + 1;
      obj["top"] = direction == "up" ? y : -y;
      movementMatrix[index2] = obj;
    }
    if(this.props.global_consoleDebug){
      console.log("ToDoList: movementMatrix(): ", movementMatrix);
    }
    this.setState({
      movementMatrix: movementMatrix
    });
  }
  reorder(allMoveUp, allMoveDown, index1, index2, direction) {
    const y = this.height;
    let todos = this.state.todos;
    /* 
        
      Notes:
    
      There are 3 possible movement scenarios:
    
      1) All move up: all items move up, except the first item which moves all the way to the down
    
      2) All move down: all items move down, except the last item which moves all the way to the up
    
      3) Two items swap: all items remain static except for the current index and the list item it will swap with
    
      Objective:
    
      Reorder items by manipulating the todo array
    
    */
    if (allMoveUp) {
      todos = this.state.todos;
      const firstItem = todos[0];
      todos.push(firstItem);
      todos.shift();
    }
    if (allMoveDown) {
      todos = this.state.todos;
      const lastItem = todos[todos.length - 1];
      todos.unshift(lastItem);
      todos.pop();
    }
    if (!allMoveUp && !allMoveDown) {
      todos = this.state.todos;
      const item1 = todos[index1];
      const item2 = todos[index2];
      todos[index1] = item2;
      todos[index2] = item1;
    }
    // Now lets update the 'todo' array
    this.setState({
      todos: this.state.todos
    });
  }
  move(index, direction) {
    this.setState({
      reorderClicked: true
    });
    const maxDistanceDown = this.state.todos.length * 55;
    const maxDistanceUp = -maxDistanceDown;
    const todosLength = this.state.todos.length - 1;
    // index1: current index of item to move
    let index1 = index;
    // index_1: index to move to of item to move
    let index_1 = index;
    // direction1: direction of item to move
    const direction1 = direction;
    let allMoveDown = false;
    let allMoveUp = false;
    // top1: y movement of item to move
    let top1 = 0;
    // direction2: direction of item to be swapped
    let direction2 = direction1 == "up" ? "down" : "up";
    if (direction1 == "up") {
      top1 = index1 > 0 ? -this.height : maxDistanceDown;
      direction2 = index1 > 0 ? "down" : "up";
      index_1 = index1 > 0 ? index1 - 1 : this.state.todos.length - 1;
    } 
    else {
      top1 = index1 < this.state.todos.length - 1 ? this.height : maxDistanceUp;
      direction2 = index1 < this.state.todos.length - 1 ? "up" : "down";
      index_1 = index1 < this.state.todos.length - 1 ? index1 + 1 : 0;
    }
    // index2: current index of item to be swapped
    let index2 = 0;
    // index_2: index to move to of item to be swapped
    let index_2 = 0;
    // top1: y movement of item to be swapped
    let top2 = 0;
    if (direction1 == "up") {
      index2 = index1 == 0 ? this.state.todos.length - 1 : index1 - 1;
      top2 = index1 == 0 ? -this.height : this.height;
      index_2 = index1 == 0 ? this.state.todos.length - 2 : index1;
      allMoveUp = index1 == 0 ? true : false;
    } 
    else {
      index2 = index1 == this.state.todos.length - 1 ? 0 : index1 + 1;
      top2 = index1 == this.state.todos.length - 1 ? this.height : -this.height;
      index_2 = index1 == this.state.todos.length - 1 ? 1 : index1;
      allMoveDown = index1 == this.state.todos.length - 1 ? true : false;
    }
    this.createMovementMatrix(
      allMoveUp,
      allMoveDown,
      index1,
      index2,
      direction
    );
    this.reorder(allMoveUp, allMoveDown, index1, index2, direction);
  }
  render() {
    if(this.props.global_consoleDebug){
      console.log('ToDoList: render(): this.props.postCount:', this.props.postCount,' this.props.postCountPrev: ',this.props.postCountPrev);
    }
    var todocontainerStyle = {
      height: this.state.todos.length * this.height + "px"
    };
    if(this.props.global_consoleDebug){
      console.log('ToDoList: render(): this.state.pages:', this.state.pages,' this.props.inputValue: ',this.props.inputValue,' this.props.contentValue: ',this.props.contentValue);
    }
    let pages = []; 
    for (var i = 1; i <= this.state.pages; i++) {
      pages.push(i);
    }
    let pagination = pages.map(
      function (page, index) {
        return (
          <Pagination 
            ordinal={page} 
            readPost={this.props.readPost.bind(this,page,this.props.origin,"",this.props.sortmethod,this.props.sortby,this.props.postbatch)} 
            page={this.props.page} 
            pages={this.props.pages} 
            maxpostpage={this.props.maxpostpage} 
            global_height={this.props.global_height} 
            global_consoleDebug={this.props.global_consoleDebug} 
            global_enableProfanityFilter={this.props.global_enableProfanityFilter} 
            global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} 
            global_restapiEndpointSecure={this.props.global_restapiEndpointSecure} 
            key={index}
          />
        );
      }.bind(this)
    );
    let prev = pages.map(
      function (page, index) {
        const defaultStyle = this.props.page == 1 ? {cursor: "default", color: "rgba(0,0,0,0.05)"} : {cursor: "pointer", color: "rgba(0,0,0,0.5)"};
        let opts = {};
        if(this.props.page != 1) {
          opts['onClick'] = this.props.readPost.bind(this,parseInt(this.props.page - 1),this.props.origin,"",this.props.sortmethod,this.props.sortby,this.props.postbatch);
        }
        return (
          page == 1 ? 
          (
          <i className="fa fa-caret-left" style={defaultStyle} {...opts}></i>
          )
          :
          (
          ""
          )
        );
      }.bind(this)
    );
    let next = pages.map(
      function (page, index) {
        const defaultStyle = this.props.page == this.props.pages ? {cursor: "default", color: "rgba(0,0,0,0.05)"} : {cursor: "pointer", color: "rgba(0,0,0,0.5)"};
        let opts = {};
        if(this.props.page != this.props.pages) {
          opts['onClick'] = this.props.readPost.bind(this,parseInt(this.props.page + 1),this.props.origin,"",this.props.sortmethod,this.props.sortby,this.props.postbatch);
        }
        return (
          page == this.props.maxpostpage ? 
          (
          <i className="fa fa-caret-right" style={defaultStyle} {...opts}></i>
          )
          :
          (
          ""
          )
        );
      }.bind(this)
    );
    pagination = (<div className="pagination-container">{prev}{pagination}{next}</div>);
    if(this.props.global_consoleDebug){
      console.log('ToDoList: render(): this.props.sortmethod: ', this.props.sortmethod,' this.props.sortby: ',this.props.sortby,' this.props.page: ',this.props.page,' this.props.postbatch: ',this.props.postbatch,' this.props.request_postbatch: ',this.props.request_postbatch,' this.props.postbatch_select: ',this.props.postbatch_select);
    }
    let titleSortmethodUpOptsClassName = {};
    titleSortmethodUpOptsClassName['className'] = "fa fa-arrow-circle-up";
    if(this.props.sortmethod == "Title" && this.props.sortby == "ASC") {
      titleSortmethodUpOptsClassName['className'] = "fa fa-arrow-circle-up current";
    }
    let titleSortmethodUpOpts = {};
    titleSortmethodUpOpts['onClick'] = this.props.readPost.bind(this,this.props.page,this.props.origin,"","Title","ASC",this.props.postbatch);
    const titleSortmethodUp = (<i {...titleSortmethodUpOptsClassName} {...titleSortmethodUpOpts}></i>);
    let titleSortmethodDownOptsClassName = {};
    titleSortmethodDownOptsClassName['className'] = "fa fa-arrow-circle-down";
    if(this.props.sortmethod == "Title" && this.props.sortby == "DESC") {
      titleSortmethodDownOptsClassName['className'] = "fa fa-arrow-circle-down current";
    }
    let titleSortmethodDownOpts = {};
    titleSortmethodDownOpts['onClick'] = this.props.readPost.bind(this,this.props.page,this.props.origin,"","Title","DESC",this.props.postbatch);
    const titleSortmethodDown = (<i {...titleSortmethodDownOptsClassName} {...titleSortmethodDownOpts}></i>);
    const titleColumnTitle = (<div className="column-title"><span>Title</span>{titleSortmethodUp}{titleSortmethodDown}</div>);
    let submissiondateSortmethodUpOptsClassName = {};
    submissiondateSortmethodUpOptsClassName['className'] = "fa fa-arrow-circle-up";
    if(this.props.sortmethod == "Submission_date" && this.props.sortby == "ASC") {
      submissiondateSortmethodUpOptsClassName['className'] = "fa fa-arrow-circle-up current";
    }
    let submissiondateSortmethodUpOpts = {};
    submissiondateSortmethodUpOpts['onClick'] = this.props.readPost.bind(this,this.props.page,this.props.origin,"","Submission_date","ASC",this.props.postbatch);
    const submissiondateSortmethodUp = (<i {...submissiondateSortmethodUpOptsClassName} {...submissiondateSortmethodUpOpts}></i>);
    let submissiondateSortmethodDownOptsClassName = {};
    submissiondateSortmethodDownOptsClassName['className'] = "fa fa-arrow-circle-down";
    if(this.props.sortmethod == "Submission_date" && this.props.sortby == "DESC") {
      submissiondateSortmethodDownOptsClassName['className'] = "fa fa-arrow-circle-down current";
    }
    let submissiondateSortmethodDownOpts = {};
    submissiondateSortmethodDownOpts['onClick'] = this.props.readPost.bind(this,this.props.page,this.props.origin,"","Submission_date","DESC",this.props.postbatch);
    const submissiondateSortmethodDown = (<i {...submissiondateSortmethodDownOptsClassName} {...submissiondateSortmethodDownOpts}></i>);
    const submissiondateColumnTitle = (<div className="column-title"><span>Created At</span>{submissiondateSortmethodUp}{submissiondateSortmethodDown}</div>);
    let resetSortmethodSortbyOptsClassName = {};
    resetSortmethodSortbyOptsClassName['className'] = "fa fa-power-off";
    let resetSortmethodSortbyOpts = {};
    resetSortmethodSortbyOpts['onClick'] = this.props.readPost.bind(this,1,this.props.origin,"","Submission_date","DESC",4,0);
    const resetSortmethodSortby = (<i {...resetSortmethodSortbyOptsClassName} {...resetSortmethodSortbyOpts}></i>);
    const resetSortmethodSortbyColumnTitle = (<div className="column-title">{resetSortmethodSortby}</div>);
    let postbatch_select = this.props.postbatch_select.map(
      function (records, index) {
      return (
        <option value={records}>{records}</option>
      );
      }.bind(this)
    );
    postbatch_select = (<div className="post-batch-select-column-title"><select className="custom" onChange={this.props.handleSelectChange.bind(this,this.props.page,this.props.origin,"",this.props.sortmethod,this.props.sortby)} value={this.props.postbatch}>{postbatch_select}</select></div>);
    const openProfanitylistModal = this.state.enableProfanityFilter == 1 ? (<i className="fa fa-file-o" onClick={this.props.openModal.bind(this,"Profanity List","The profanity list contains highly offensive words. This list is for testing purposes only.","View Profanity List",1)}></i>) : ("") ;
    // loop through list item array and initiate <ToDo /> child components
    let todos = null;
    if(this.props.origin == "posts"){
      todos = this.state.todos.map(
        function (todo, index) {
          return (
          <ToDo 
            key={index} 
            keyRef={index} 
            ref={index} 
            title={todo.title} 
            content={todo.content} 
            done={todo.done} 
            slug={todo.slug} 
            createdAt={todo.createdAt} 
            postid={todo.postid}
            removeTodo={this.props.removeTodo.bind(this,index,"posts",todo.postid)}
            markTodoDone={this.props.markTodoDone.bind(this,index)}
            moveUp={this.move.bind(this,index,"up")}
            moveDown={this.move.bind(this,index,"down")} 
            global_height={this.props.global_height} 
            global_consoleDebug={this.props.global_consoleDebug} 
            global_enableProfanityFilter={this.props.global_enableProfanityFilter} 
            global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} 
            global_restapiEndpointSecure={this.props.global_restapiEndpointSecure}
          />
          );
        }.bind(this)
      );
    }
    else{
      todos = this.state.todos.map(
        function (todo, index) {
          return (
          <Post 
            key={index} 
            keyRef={index} 
            ref={index} 
            title={todo.title} 
            done={todo.done} 
            slug={todo.slug} 
            createdAt={todo.createdAt} 
            content={todo.content} 
            id1={this.props.id} 
            id2={todo.id} 
            postid={todo.postid}
            removeTodo={this.props.removeTodo.bind(this,index,"post",todo.postid)} 
            global_height={this.props.global_height} 
            global_consoleDebug={this.props.global_consoleDebug} 
            global_enableProfanityFilter={this.props.global_enableProfanityFilter} 
            global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} 
            global_restapiEndpointSecure={this.props.global_restapiEndpointSecure}
          />
          );
        }.bind(this)
      );
    }
    if(!todos){
      todos = (<div className="spinner-container"><div className="spinner-container-inner"><Spinner singleColor /></div></div>)
    }
    const mdltextfieldStyle = {
      marginBottom: "0px"
    };
    const clearbothStyle = {
      clear: "both"
    };
    let optsClassName1 = {};
    optsClassName1['className'] = "demo-card-wide";
    let optsClassName2 = {};
    optsClassName2['className'] = "posts";
    let optsClassName3 = {};
    optsClassName3['className'] = "enableprofanityfilter";
    let optsClassName4 = {};
    optsClassName4['className'] = "columns";
    return (
      this.state.redirect == false ? (
      this.props.origin == "posts" ? 
      (
      <Card shadow={0} {...optsClassName1}>
        <CardTitle {...optsClassName2}>
          <h2 className="mdl-card__title-text">Posts<span><i id="post-count-icon" className="fa fa-files-o"></i>{this.state.postCount}</span></h2>
        </CardTitle>
        <CardText>
          Please choose between the following endpoints:
          <Endpoint toggleEndpoints={this.props.toggleEndpoints} restapiEndpointType={this.props.restapiEndpointType} global_height={this.props.global_height} global_consoleDebug={this.props.global_consoleDebug} global_enableProfanityFilter={this.props.global_enableProfanityFilter} global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} global_restapiEndpointSecure={this.props.global_restapiEndpointSecure} />
        </CardText>
        <CardActions border {...optsClassName3}>
          Please choose whether to enable the profanity filter:
          <EnableProfanityFilter toggleEnableprofanityfilter={this.props.toggleEnableprofanityfilter} enableprofanityfilter={this.props.enableprofanityfilter} global_height={this.props.global_height} global_consoleDebug={this.props.global_consoleDebug} global_enableProfanityFilter={this.props.global_enableProfanityFilter} global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} global_restapiEndpointSecure={this.props.global_restapiEndpointSecure} />
          {openProfanitylistModal}
        </CardActions>
        <CardActions border {...optsClassName4}>
          <div className="column-title-container">
            <div className="column-title-container-inner">
              {titleColumnTitle}
              {submissiondateColumnTitle}
              {resetSortmethodSortbyColumnTitle}
              {postbatch_select}
            </div>
          </div>
        </CardActions>
        <CardActions border>
          <div className="todo-container" style={todocontainerStyle}>
            {todos}
          </div>
          {pagination}
          <form>
            <div className="mdl-textfield mdl-js-textfield" style={mdltextfieldStyle}>
              <Textfield 
              value={this.props.inputValue} 
              onChange={this.props.handleChange.bind(this)} 
              placeholder="Post title" 
              label="" 
              />
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <Textfield 
              value={this.props.contentValue} 
              onChange={this.props.handleContentChange.bind(this)} 
              placeholder="Post content" 
              label="" 
              rows="6" 
              />
            </div>
            <a className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.props.addTodo.bind(this)}>
              Add Post
            </a>
          </form>
          <div id="restapi-container" className="restapi-container">
            <div id="restapi-container-legend" className="restapi-container-legend">
              Message from Server
            </div>
            <div id="restapi-container-text" className="restapi-container-text">
              <div id="restapi-container-text-subtitle" className="restapi-container-text-subtitle">
                <i id="restapi-container-text-subtitle-icon" className="fa fa-check-circle information"></i>
                <span id="restapi-container-text-subtitle-span">No errors detected</span>
              </div>
              <div id="restapi-container-text-inner" className="restapi-container-text-inner">
              </div>
            </div>
          </div>
          <div style={clearbothStyle}></div>
        </CardActions>
        <CardMenu style={{color: '#fff'}}>
          <IconButton name="share" />
        </CardMenu>
      </Card>
      )
      :
      (
      <div>
        {todos}
      </div>
      )
      )
      :
      (<Redirect to="/" />)
    );
  }
}

export default ToDoList;