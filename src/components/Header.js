import React, { Component } from 'react';
import ToDoList from "./ToDoList";
import Posts from "./Posts";
import NotFound from "./NotFound";

import { format } from "date-fns";

import {
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      inputValue: "",
      contentValue: "",
      movementMatrix: [],
      reorderClicked: false,
      slug: "",
      redirect: false,
      postCount: 0,
      postCountPrev: 0,
      addToDo: false,
      pages: 0,
      page: 1,
      dataFetched: false,
      origin: "",
      restapiEndpoint: this.props.global_restapiEndpointSecure,
      restapiEndpointType: "secure",
      maxpostpage: 1,
      sortmethod: "Submission_date",
      sortby: "DESC",
      postbatch: 4,
      request_postbatch: 4,
      postbatch_select: [],
      enableprofanityfilter: 0,
      request_profanitylist: []
    };
    this.createPost = this.createPost.bind(this);
    this.readPost = this.readPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.showProfanitylist = this.showProfanitylist.bind(this);
    this.openModal = this.openModal.bind(this);
    this.createSnackBar = this.createSnackBar.bind(this);
    this.randomIntInc = this.randomIntInc.bind(this);
    this.titleFormat = this.titleFormat.bind(this);
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
    this.createSlug = this.createSlug.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.count = this.count.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.toggleEndpoints = this.toggleEndpoints.bind(this);
    this.toggleEnableprofanityfilter = this.toggleEnableprofanityfilter.bind(this);
    this.readPost(this.state.page);
  }
  componentDidUpdate(){
    const mdlLayoutDrawerButton = document.querySelector(".mdl-layout__drawer-button");
    if(mdlLayoutDrawerButton){
      if(this.props.global_consoleDebug){
        console.log("Header: componentDidUpdate(): mdlLayoutDrawerButton exists");
      }
    }
    else{
      if(this.props.global_consoleDebug){
        console.log("Header: componentDidUpdate(): mdlLayoutDrawerButton does not exist");
      }
      const mdlJsLayout = document.querySelectorAll(".mdl-js-layout");
      window.componentHandler.downgradeElements(mdlJsLayout);
      try{
        window.componentHandler.register({
          constructor: window.MaterialLayout,
          classAsString: 'MaterialLayout',
          cssClass: 'mdl-js-layout'
        });
      }
      catch(e){
      }
    }
  }
  componentDidMount() {
    //window.componentHandler.upgradeDom();
    this.setState({
      postCountPrev: this.state.postCount
    });
  }
  // CRUD
  // Pages: READ
  readPages(){
    const url = this.state.restapiEndpoint + "/posts/1";
    fetch(url,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if(this.props.global_consoleDebug){
        console.log('Header: readPages(): Success: data:', data);
      }
      if(data['posts'].length > 0){
        this.setState({
          pages: data['pages'] 
        },function(){
          if(this.props.global_consoleDebug){
            console.log('Header: readPages(): this.state.pages:', this.state.pages);
          }
        });
      }
    })
    .catch((error) => {
      console.error('Header: readPages(): Error: data:', error);
    });
  }
  // CRUD
  // Post: CREATE
  createPost(title,content){
    title = (arguments[0] != null) ? arguments[0] : "";
    content = (arguments[1] != null) ? arguments[1] : "";
    const path = "/post/0";
    const url = this.state.restapiEndpoint + "/post/0/" + this.state.enableprofanityfilter;
    fetch(url,{
      method: 'POST', // or 'PUT'
      headers: {
        title: title,
        content: content
      },
    })
    .then(response => {
      if(!response.ok){
        throw response;
      }
      return response.json();
    })
    .then(data => {
      data['method'] = "POST";
      data['path'] = path;
      data['response'] = "200 OK";
      const json = JSON.stringify(data,null,2);
      if(data['error'].trim() === ""){
        if(this.props.global_consoleDebug){
          console.log('Header: createPost(): Success: data:', data);
        }
      }
      else{
        this.createSnackBar(data['error']);
        if(this.props.global_consoleDebug){
          console.log('Header: createPost(): error:', data['error']);
        }
      }
      this.readPost(this.state.page,"create-post",json,this.state.sortmethod,this.state.sortby,this.state.postbatch,data['error']);
    })
    .catch((error) => {
      error.text().then( errorMessage => {
        //const error = JSON.parse(errorMessage);
        //const errorText = error['ERROR'];
        const errorText = "An error occurred on the server. Please try again later...";
        const data = {};
        data['method'] = "POST";
        data['path'] = path;
        data['response'] = "500";
        data['error'] = errorText;
        const json = JSON.stringify(data,null,2);
        this.createSnackBar(data['error']);
        if(this.props.global_consoleDebug){
          console.log('Header: createPost(): error:', data['error']);
        }
        this.readPost(this.state.page,"create-post",json,this.state.sortmethod,this.state.sortby,this.state.postbatch,data['error']);
      });
    });
  }
  // Post: READ
  readPost(page,origin,json,sortmethod,sortby,postbatch,error){
    page = (arguments[0] != null) ? arguments[0] : 1;
    origin = (arguments[1] != null) ? arguments[1] : "";
    json = (arguments[2] != null) ? arguments[2] : "";
    sortmethod = (arguments[3] != null) ? arguments[3] : this.state.sortmethod;
    sortby = (arguments[4] != null) ? arguments[4] : this.state.sortby;
    postbatch = (arguments[5] != null) ? arguments[5] : this.state.postbatch;
    error = (arguments[6] != null) ? arguments[6] : "";
    if(this.props.global_consoleDebug){
      console.log('Header: readPost(): postbatch:', postbatch);
    }
    if(origin !== ""){
      this.setState({
        dataFetched: false  
      });
    }
    const url = this.state.restapiEndpoint + "/posts/" + page + "/" + sortmethod + "/" + sortby + "/" + postbatch;
    fetch(url,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if(this.props.global_consoleDebug){
        console.log('Header: readPost(): Success: data:', data);
      }
      let posts = [];
      if(data['posts'].length > 0){
        for (var i = 0; i < data['posts'].length; i++) {
          const id = parseInt(i + 1);
          const obj1 = data['posts'][i];
          const title = this.titleFormat(obj1['title']);
          const slug = this.createSlug(title,id);
          const content = this.capitalizeFirstLetter(obj1['content']);
          const createdAt = obj1['createdAt'];
          const obj2 = {
            id: id,
            slug: slug,
            title: title,
            content: content,
            done: true,
            createdAt: createdAt,
            postid: obj1['postid']
          }	
          posts.push(obj2);	  
        } 
        this.count(data['recordcount']);
        this.setState({
          posts: posts,
          pages: data['pages'],
          page: page,
          dataFetched: true,
          maxpostpage: data['maxpostpage'],
          sortmethod: sortmethod,
          sortby: sortby,
          postbatch: postbatch,
          request_postbatch: data['request_postbatch'], 
          postbatch_select: data['postbatch_select'],
          request_profanitylist: data['request_profanitylist']
        },function(){
          //if(this.props.global_consoleDebug){
            console.log('Header: readPost(): this.state:', this.state);
          //}
          this.toggleEndpoints(this.state.restapiEndpointType);
        });
        if(json !== ""){
          const restapiContainerTextInner = document.getElementById("restapi-container-text-inner");
          if(restapiContainerTextInner){
            restapiContainerTextInner.innerText = json;
            const restapiContainerText = document.getElementById("restapi-container-text");
            if(restapiContainerText){
              if(error.trim() === ""){
                restapiContainerText.style.background = "rgba(0,0,0,0.0125)";
              }
              else{
                restapiContainerText.style.background = "#fef6f5";
              }
            }
            const restapiContainerTextSubtitleSpan = document.getElementById("restapi-container-text-subtitle-span");
            if(restapiContainerTextSubtitleSpan){
              if(error.trim() === ""){
                restapiContainerTextSubtitleSpan.innerText = "No errors detected";
              }
              else{
                restapiContainerTextSubtitleSpan.innerText = "Errors detected";
              }
              const id = "restapi-container-text-subtitle-icon";
              let restapiContainerTextSubtitleIcon = document.getElementById(id);
              if(restapiContainerTextSubtitleIcon){
                restapiContainerTextSubtitleIcon.classList.remove("information","error","fa-check-circle","fa-ban");
                if(error.trim() === ""){
                  restapiContainerTextSubtitleIcon.classList.add("fa-check-circle","information");
                }
                else{
                  restapiContainerTextSubtitleIcon.classList.add("fa-ban","error");
                }
              }
            }
            if(this.props.global_consoleDebug){
              console.log('Header: readPost(): Success: json:', json);
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error('Header: readPost(): Error: data:', error);
    });
  }
  // Post: DELETE
  deletePost(postid){
    var postid = (arguments[0] != null) ? arguments[0] : 0;
    const path = "/post/" + postid;
    const url = this.state.restapiEndpoint + "/post/" + postid + "/0";
    fetch(url,{
      method: 'POST', // or 'PUT'
      headers: {
        'X-HTTP-METHOD-OVERRIDE': 'DELETE'
      },
    })
    .then(response => {
      if(!response.ok){
        throw response;
      }
      return response.json();
    })
    .then(data => {
      data['method'] = "DELETE";
      data['path'] = path;
      data['response'] = "200 OK";
      const json = JSON.stringify(data,null,2);
      if(this.props.global_consoleDebug){
        console.log('Header: deletePost(): Success: data:', data);
      }
      this.readPost(this.state.page,"delete-post",json);
    })
    .catch((error) => {
      error.text().then( errorMessage => {
        const error = JSON.parse(errorMessage);
        //const errorText = error['ERROR'];
        const errorText = "An error occurred on the server. Please try again later...";
        const data = {};
        data['method'] = "DELETE";
        data['path'] = path;
        data['response'] = "500";
        data['error'] = errorText;
        const json = JSON.stringify(data,null,2);
        this.createSnackBar(data['error']);
        if(this.props.global_consoleDebug){
          console.log('Header: deletePost(): error:', data['error']);
        }
        this.readPost(this.state.page,"delete-post",json,this.state.sortmethod,this.state.sortby,this.state.postbatch,data['error']);
      });
    });
  }
  // UDF Methods
  showProfanitylist(){
    //if(this.props.global_consoleDebug){
      console.log("Header: showProfanitylist()");
    //}
    const profanityList = document.querySelector(".profanity-list");
    //if(this.props.global_consoleDebug){
      console.log("Header: showProfanitylist(): profanityList: ",profanityList);
    //}
    if(profanityList){
      const display = profanityList.style.display;
      //if(this.props.global_consoleDebug){
        console.log("Header: showProfanitylist(): display: ",display);
      //}
      if(display.trim() === "none"){
        profanityList.style.display = "block";
      }
      else{
        profanityList.style.display = "none";
      }
    }
  }
  openModal(title,message,buttonTitle,callback) {
    var title = (arguments[0] != null) ? arguments[0] : "";
    var message = (arguments[1] != null) ? arguments[1] : "";
    var buttonTitle = (arguments[2] != null) ? arguments[2] : "";
    var callback = (arguments[3] != null) ? arguments[3] : 0;
    //if(this.props.global_consoleDebug){
      console.log("Header: openModal(): callback: ",callback);
    //}
    const id = "dialog-modal";
    let dialogContainer = document.getElementById(id);
    //if(this.props.global_consoleDebug){
      console.log("Header: openModal(): dialogContainer: ",dialogContainer);
    //}
    if(!dialogContainer){
      const dialog = document.createElement("dialog");
      dialog.setAttribute("id",id);
      dialog.classList.add("mdl-dialog");
      const h3 = document.createElement("h3");
      h3.classList.add("mdl-dialog__title");
      const h3Textnode = document.createTextNode(title);
      const div1 = document.createElement("div");
      div1.classList.add("mdl-dialog__content");
      const p = document.createElement("p");
      const pTextnode = document.createTextNode(message);
      const select1 = document.createElement("select");
      select1.classList.add("profanity-list");
      select1.setAttribute("style","display:none;");
      for (var i = 0; i < this.state.request_profanitylist.length; i++) {
        const idx = this.state.request_profanitylist[i];
        const option = document.createElement("option");
        option.setAttribute("value",idx);
        const optionTextnode = document.createTextNode(idx);
        option.appendChild(optionTextnode);
        select1.appendChild(option);
      } 
      const div2 = document.createElement("div");
      div2.classList.add("mdl-dialog__actions","--full-width");
      const button1 = document.createElement("button");
      button1.classList.add("mdl-button","close");
      const button1Textnode = document.createTextNode("Close");
      //if(buttonTitle.trim() != ""){
        const button2 = document.createElement("button");
        button2.classList.add("mdl-button","callback");
        const button2Textnode = document.createTextNode(buttonTitle);
      //}
      h3.appendChild(h3Textnode);
      p.appendChild(pTextnode);
      div1.appendChild(p);
      div1.appendChild(select1);
      button1.appendChild(button1Textnode);
      div2.appendChild(button1);
      //if(buttonTitle.trim() != ""){
        button2.appendChild(button2Textnode);
        div2.appendChild(button2);
      //}
      dialog.appendChild(h3);
      dialog.appendChild(div1);
      dialog.appendChild(div2);
      document.body.appendChild(dialog);
      window.componentHandler.upgradeDom();
      dialogContainer = document.getElementById(id);
    }
    if(dialogContainer){
      if(!dialogContainer.showModal){
        window.dialogPolyfill.registerDialog(dialogContainer);
      }
      dialogContainer.showModal();
      //if(buttonTitle.trim() != ""){
        dialogContainer.querySelector('button.callback')
        .addEventListener('click', function() {
          if(callback === 1){
            this.showProfanitylist();
          }
        }.bind(this));
      //}
      dialogContainer.querySelector('button.close')
      .addEventListener('click', function() {
        dialogContainer.close();
        dialogContainer = document.getElementById(id);
        if(dialogContainer){
          dialogContainer.remove();
        }
      });
    }
  }
  createSnackBar(message,type) {
    var message = (arguments[0] != null) ? arguments[0] : "";
    var type = (arguments[1] != null) ? arguments[1] : "";
    const id = "snackbar-message";
    let snackbarContainer = document.getElementById(id);
    if(this.props.global_consoleDebug){
      console.log("Header: createSnackBar(): snackbarContainer: ",snackbarContainer);
    }
    if(!snackbarContainer){
      const div1 = document.createElement("div");
      div1.setAttribute("id",id);
      div1.classList.add("mdl-js-snackbar","mdl-snackbar");
      const div2 = document.createElement("div");
      div2.classList.add("mdl-snackbar__text");
      const button = document.createElement("button");
      button.classList.add("mdl-snackbar__action");
      div1.appendChild(div2);
      div1.appendChild(button);
      document.body.appendChild(div1);
      window.componentHandler.upgradeDom();
      snackbarContainer = document.getElementById(id);
    }
    if(snackbarContainer){
      setTimeout(function(){
        if(snackbarContainer){
          var data = {
            message:message,
            timeout:5000,
            actionHandler:function(event){
              snackbarContainer.classList.remove("mdl-snackbar--active")
            },
            actionText:'Close'
          };
          try{
            if(this.props.global_consoleDebug){
              console.log("Header: createSnackBar(): snackbarContainer.MaterialSnackbar: ",snackbarContainer.MaterialSnackbar);
            }
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
          }
          catch(e){
          }
        }
      },1000);
    }
  }
  randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }
  titleFormat(string){
    const words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  createSlug(slug,id) {
    var slug = (arguments[0] != null) ? arguments[0] : "";
    var id = (arguments[1] != null) ? arguments[1] : parseInt(this.state.posts.length + 1);
    let value = "";
    const punctuationPattern = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gim;
    value = slug.replace(punctuationPattern, "");
    value = value.trim();
    value = value.replace(/[\s]+/gim, "-");
    value = value.toLowerCase();
    if(this.props.global_consoleDebug){
      console.log("Header: createSlug(): value: ", value);
    }
    value = value + "-" + id;
    return value;
  }
  addTodo(e) {
    const todos = this.state.posts;
    if (this.state.inputValue.trim() != "") {
      const inputValue = this.state.inputValue;
      const contentValue = this.state.contentValue;
      const slug = this.createSlug(inputValue);
      const content = this.capitalizeFirstLetter(contentValue);
      const createdAt = format(new Date(), "yyyy-mm-dd hh:mm:ss");
      todos.push({
        title: inputValue,
        done: false,
        slug: slug,
        content: content,
        createdAt: createdAt,
        postid: 0
      });
      this.setState({
        posts: todos,
        inputValue: "",
        contentValue: "",
        addToDo: true
      });
      const title = this.titleFormat(inputValue);
      this.createPost(title,content);
    }
  }
  handleSelectChange(page,origin,json,sortmethod,sortby,event) {
    var page = (arguments[0] != null) ? arguments[0] : 1;
    var origin = (arguments[1] != null) ? arguments[1] : "";
    var json = (arguments[2] != null) ? arguments[2] : "";
    var sortmethod = (arguments[3] != null) ? arguments[3] : this.state.sortmethod;
    var sortby = (arguments[4] != null) ? arguments[4] : this.state.sortby;
    var enableprofanityfilter = (arguments[5] != null) ? arguments[5] : this.state.enableprofanityfilter;
    if(this.props.global_consoleDebug){
      console.log('Header: handleSelectChange():  page: ',page,' origin: ',origin,' json: ',json,' sortmethod: ',sortmethod,' sortby: ',sortby,' postbatch: ',event.target.value);
    }
    this.readPost(page,origin,json,sortmethod,sortby,event.target.value);
  }
  handleChange(e) {
    this.setState({
      dataFetched: false  
    });
    this.setState({
      inputValue: e.target.value,
      dataFetched: true 
    },function(){
      if(this.props.global_consoleDebug){
        console.log("Header: handleChange(): this.state.inputValue: ",this.state.inputValue);
      }
    });
  }
  handleContentChange(e) {
    this.setState({
      dataFetched: false  
    });
    this.setState({
      contentValue: e.target.value,
      dataFetched: true 
    },function(){
      if(this.props.global_consoleDebug){
        console.log("Header: handleContentChange(): this.state.contentValue: ",this.state.contentValue);
      }
    });
  }
  count(n) {
    this.setState({
      postCountPrev: this.state.postCount,
      postCount: n
    });		
  }
  removeTodo(index,origin,postid) {
    var index = (arguments[0] != null) ? arguments[0] : 0;
    var origin = (arguments[1] != null) ? arguments[1] : "";
    var postid = (arguments[2] != null) ? arguments[2] : 0;
    if(this.props.global_consoleDebug){
      console.log("Header: removeTodo(): index: ",index," origin: ",origin," postid: ",postid);
    }
    this.state.posts.splice(index, 1);
    this.setState({
      posts: this.state.posts
    });
    if(postid > 0){
      this.deletePost(postid);
    }
    if(origin === "post"){
      this.setState({
        redirect: true
      });
    }
  }
  markTodoDone(index) {
    const todos = this.state.posts;
    const todo = this.state.posts[index];
    todos.splice(index, 1);
    todo.done = !todo.done;
    todo.done ? todos.push(todo) : todos.unshift(todo);
    this.setState({
      posts: todos
    });
  }
  toggleEndpoints(type) {
    this.setState({
      restapiEndpoint: type === "secure" ? this.props.global_restapiEndpointSecure : this.props.global_restapiEndpointInsecure,
      restapiEndpointType: type 
    },function(){
      if(this.props.global_consoleDebug){
        console.log("Header: toggleEndpoints(): this.state.restapiEndpoint: ",this.state.restapiEndpoint,"this.state.restapiEndpointType: ",this.state.restapiEndpointType);
      }
    });
  }
  toggleEnableprofanityfilter(type) {
    this.setState({
      enableprofanityfilter: type 
    },function(){
      if(this.props.global_consoleDebug){
        console.log("Header: toggleEnableprofanityfilter(): this.state.enableprofanityfilter: ",this.state.enableprofanityfilter);
      }
    });
  }
  render() {
    var posts = this.state.posts.map(
      function (post, index) {
        const link = "/post/" + post.slug;
        return (
          <NavLink className="mdl-navigation__link" to={link} key={post.postid}>
            {post.title}
          </NavLink>
        );
      }.bind(this)
    );
    //this.state.dataFetched = false;
    return (
    this.state.dataFetched === true ? (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header id="mdl-layout__header" className="mdl-layout__header">
          <Link to="/">
            <i className="fa fa-home home"></i>
          </Link>
            <a className="bitbucket-link" href="https://bitbucket.org/charlesrobertson/react-router-es6/src/master/" target="_blank"><i className="fa fa-github"></i></a>
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Postman REST API</span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only"></nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Postman REST API</span>
          <nav className="mdl-navigation">
            <NavLink className="mdl-navigation__link" to="/">
              Home
            </NavLink>
            {posts}
          </nav>
        </div>
        <main className="mdl-layout__content">
          <div className="page-content">
            <Switch>
              <Route
                exact
                path="/"
                render={() => { 
                  if(this.props.global_consoleDebug){
                    console.log("Header: render 2: this.state ", this.state);
                  }
                  return (
                    <Posts posts={this.state.posts} removeTodo={this.removeTodo} markTodoDone={this.markTodoDone} addTodo={this.addTodo} readPost={this.readPost} pages={this.state.pages} postCount={this.state.postCount} handleChange={this.handleChange} handleContentChange={this.handleContentChange} inputValue={this.state.inputValue} contentValue={this.state.contentValue} postCountPrev={this.state.postCountPrev} toggleEndpoints={this.toggleEndpoints} restapiEndpointType={this.state.restapiEndpointType} page={this.state.page} maxpostpage={this.state.maxpostpage} sortmethod={this.state.sortmethod} sortby={this.state.sortby} postbatch={this.state.postbatch} request_postbatch={this.state.request_postbatch} postbatch_select={this.state.postbatch_select} handleSelectChange={this.handleSelectChange} enableprofanityfilter={this.state.enableprofanityfilter} toggleEnableprofanityfilter={this.toggleEnableprofanityfilter} openModal={this.openModal} showProfanitylist={this.showProfanitylist} global_height={this.props.global_height} global_consoleDebug={this.props.global_consoleDebug} global_enableProfanityFilter={this.props.global_enableProfanityFilter} global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} global_restapiEndpointSecure={this.props.global_restapiEndpointSecure} />)
                  }
                }
              />
              <Route
                path="/post/:postSlug"
                render={(props) => {
                  if(this.props.global_consoleDebug){
                    console.log("Header: render: props ", props);
                    console.log("Header: render: props.location.state ", props.location.state);
                    console.log("Header: render: this.state.posts ", this.state.posts);
                  }
                  const post = this.state.posts.find(
                    (post) => post.slug === props.match.params.postSlug
                  );
                  if (post)
                    return (
                      <ToDoList origin="post" posts={this.state.posts} id={post.id} removeTodo={this.removeTodo} markTodoDone={this.markTodoDone} addTodo={this.addTodo} readPost={this.readPost} pages={this.state.pages} postCount={this.state.postCount} handleChange={this.handleChange} handleContentChange={this.handleContentChange} inputValue={this.state.inputValue} contentValue={this.state.contentValue} postCountPrev={this.state.postCountPrev} toggleEndpoints={this.toggleEndpoints} restapiEndpointType={this.state.restapiEndpointType} page={this.state.page} maxpostpage={this.state.maxpostpage} sortmethod={this.state.sortmethod} sortby={this.state.sortby} postbatch={this.state.postbatch} request_postbatch={this.state.request_postbatch} postbatch_select={this.state.postbatch_select} handleSelectChange={this.handleSelectChange} enableprofanityfilter={this.state.enableprofanityfilter} toggleEnableprofanityfilter={this.toggleEnableprofanityfilter} openModal={this.openModal} showProfanitylist={this.showProfanitylist} global_height={this.props.global_height} global_consoleDebug={this.props.global_consoleDebug} global_enableProfanityFilter={this.props.global_enableProfanityFilter} global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} global_restapiEndpointSecure={this.props.global_restapiEndpointSecure} />
                    );
                  else return <NotFound global_height={this.props.global_height} global_consoleDebug={this.props.global_consoleDebug} global_enableProfanityFilter={this.props.global_enableProfanityFilter} global_restapiEndpointInsecure={this.props.global_restapiEndpointInsecure} global_restapiEndpointSecure={this.props.global_restapiEndpointSecure} />;
                }}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
      </div>
      )
      :
      (
      <div className="spinner-container-outer">
        <div className="spinner-container-fetch">
          <div className="spinner-container-inner">
            <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
          </div>
        </div>
      </div>
      )
    );
  }
}

export default Header;