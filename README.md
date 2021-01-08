# REACT ES6 REST API #

## Introduction ##

This repo contains a **create-react-app** version of the CDN codepen.io app at:

https://codepen.io/charles1971/pen/XWjZPpr

The CDN version of this project, used the following React files:

    React v17.0.1

    https://unpkg.com/react/umd/react.development.js 
    https://unpkg.com/react-dom/umd/react-dom.development.js 
    https://unpkg.com/react-router-dom@4.3.1/umd/react-router-dom.js

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