# REACT ES6 REST API #

**React Type:** Class Component

## Introduction ##

Simple SPA that allows a user to submit a post, consisting of title and content. Each post gets allocated a dynamically created slug, which allows the post to link to a details page. The post can be deleted from both the list page and the details page. The list of posts can be reordered, using a simple up and down arrow system. The reorder system uses GSAP's TweenMax animation plugin to provide helpful directional hints.

## Repo ##

This repo contains a **create-react-app** version of the CDN codepen.io app at:

https://codepen.io/charles1971/pen/XWjZPpr

The CDN version of this project, used the following React files:

    React v17.0.1

    https://unpkg.com/react/umd/react.development.js 
    https://unpkg.com/react-dom/umd/react-dom.development.js 
    https://unpkg.com/react-router-dom@4.3.1/umd/react-router-dom.js

## Features ##

1. React Router
2. React State/Props 
3. React Material Design Lite [mdl] UI:
   https://getmdl.io/
   https://tleunen.github.io/react-mdl/components/
4. Clientside Fetch API   
5. Remote REST API, using Taffy.io:
   https://taffy.io/
6. Lucee Tomcat Application Server [Coldfusion: CFML] on Windows 2012R2 IIS7
   https://www.lucee.org/
7. Pagination system
8. Sort by title and submission date, both in ascending and descending order
9. Change post per page amount   
10. Profanity filter   
11. Reset feature

## App Structure ##

    SRC
    - App
    - COMPONENTS
    -- EnableProfanityFilter
    -- Endpoint
    -- NotFound	
    -- PageHeader	
    -- Pagination
    -- Post
    -- Posts
    -- SnackBar
    -- ToDo
    -- ToDoList

## Functional Components Repo ##

https://bitbucket.org/charlesrobertson/react-restapi-functional-es6/src/master/

## Remote Build ##

**Class Components:** 

https://community.establishmindfulness.com/assets-react_es6_restapi/index.html

## Notes ##

The following modules were imported to replace CDN JavaScript source files:

1. TweenMax -> react-gsap

    https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min.js

2. Material Lite -> react-mdl
3. Material Lite **Dialog** could not be replaced due to problems with the react-mdl version. The CDN DOM version was used instead. This may cause problems during the build phase:

    https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.2/dialog-polyfill.min.css
    https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.2/dialog-polyfill.min.js
    https://code.getmdl.io/1.3.0/material.indigo-pink.min.css		
    https://code.getmdl.io/1.3.0/material.min.js

4. date-fns -> react-date-fns

    https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.min.js