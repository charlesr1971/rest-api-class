# REACT ES6 REST API #

## Introduction ##

This repo contains a **create-react-app** version of the CDN codepen.io app at:

https://codepen.io/charles1971/pen/XWjZPpr

## Notes ##

The following modules were imported to replace CDN JavaScript source files:

1. TweenMax -> react-gsap
2. Material Lite -> react-mdl
3. Material Lite **Dialog** could not be replaced due to problems with the react-mdl version. The CDN DOM version was used instead. This may cause problems during the build phase.
4. date-fns -> react-date-fns