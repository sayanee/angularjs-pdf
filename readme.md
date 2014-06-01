# angular-pdf [![Build Status](https://travis-ci.org/sayanee/angularjs-pdf.png)](https://travis-ci.org/sayanee/angularjs-pdf) [![Dependency Status](https://gemnasium.com/sayanee/angularjs-pdf.png)](https://gemnasium.com/sayanee/angularjs-pdf)


>An [AngularJS](http://angularjs.org/) [directive](http://docs.angularjs.org/guide/directive) `ng-pdf` to display PDF files with [PDFJS](http://mozilla.github.io/pdf.js/).

## Overview [[demo](http://sayan.ee/angularjs-pdf/)]

Integrate PDF files right into web pages.

![Angular PDF](ng-pdf.gif)

###Features

1. next / previous page
1. zoom in / out
1. rotate clockwise
1. jump to a page number
1. when scrolling, the pdf controls will get fixed position at the top
1. define the view template
1. define the path to pdf with scope variable

##Requirements

1. [AngularJS](http://angularjs.org/) - get the latest [angular.min.js](https://developers.google.com/speed/libraries/devguide#angularjs)
1. [PDFJS](http://mozilla.github.io/pdf.js/) - build the files [`pdf.js` and `pdf.worker.js`](https://github.com/mozilla/pdf.js#building-pdfjs)

## Getting Started

1. install or copy over the file `dist/angular-pdf.min.js` or `dist/angular-pdf.js`

    ```
    bower install angular-pdf
    ```
1. include the path to the direcitve file in `index.html`

    ```
    <script src="js/vendor/angular-pdf/dist/angular-pdf.js"></script>
    ```

1. include the directive as a dependency when defining the angular app:

    ```
    var app = angular.module('App', ['pdf']);
    ```
1. include the directive with the 3 attribute:
	1.  `template-url`: path to the partial under a controller
	1. `canvasid`: `id` of the `canvas` tag you intend put in the next step 5
	1. `scale`: initial scale of the pdf

    ```
    <div class="wrapper" ng-controller="DocCtrl">
        <ng-pdf template-url="/partials/viewer.html" canvasid="pdf-canvas" scale="1"></ng-pdf>
    </div>
    ```
1. include the `canvas` element to display the pdf in the template-url file

    ```
    <canvas id="pdf-canvas"></canvas>
    ```
1. include the path to the pdf file in the controller

    ```
    app.controller('DocCtrl', function($scope) {
        $scope.pdfUrl = '/pdf/relativity.pdf';
    });
    ```

###Options

1. **Next / Previous page**: Include the controls in the view file as defined in the attribute `template-url`

    ```
    <button ng-click="goPrevious()"><</span></button>
    <button ng-click="goNext()">></span></button>
    ```
1. **Zoom in / out**: Include the controls in the view file as defined in the attribute `template-url`

    ```
    <button ng-click="zoomIn()">+</span></button>
    <button ng-click="zoomOut()">-</span></button>
    ```
1. **Rotate clockwise**: Include the controls in the view file as defined in the attribute `template-url` and the initial class `rotate0`

    ```
    <button ng-click="rotate()">90</span></button>
    ...
    <canvas id="pdf-canvas" class="rotate0"></canvas>
    ```

    include the css styles:

    ```
    .rotate0 {-webkit-transform: rotate(0deg); transform: rotate(0deg); }
    .rotate90 {-webkit-transform: rotate(90deg); transform: rotate(90deg); }
    .rotate180 {-webkit-transform: rotate(180deg); transform: rotate(180deg); }
    .rotate270 {-webkit-transform: rotate(270deg); transform: rotate(270deg); }
    ```
1. **Jump to page number**: Include the controls in the view file as defined in the attribute `template-url`

    ```
    <span>Page: </span><input type="text" min=1 ng-model="pageNum"><span> / {{pageCount}}</span>
    ```
1. **Fixed pdf controls upon scrolling**: Wrap the controls in the view file as defined in the attribute `template-url` with a tag `nav` with an `ng-class`. Amend the scroll amount as required.

    ```
    <nav ng-class="getNavStyle(scroll)">
    ...
    </nav>
    ```
    
    Declare the `ng-class` logic in the controller `js/controllers/docCtrl.js`
    
    ```
    $scope.getNavStyle = function(scroll) {
	    if(scroll > 100) return 'pdf-controls fixed';
	    else return 'pdf-controls';
	 }
    ```

    And include the relevant css styles as required:

    ```
    .pdf-controls { width: 100%; display: block; background: #eee; padding: 1em;}
    .fixed { position: fixed; top: 0; left: calc(50% - 480px); z-index: 100; width: 100%; padding: 1em; background: rgba(238, 238, 238,.9); width: 960px; }
    ```
1. open the file `index.html` with a web server


##Similar projects

1. [ng-pdfviewer](https://github.com/akrennmair/ng-pdfviewer)


##Credit

PDF example used is [Relativity: The Special and General Theory by Albert Einstein](http://www.gutenberg.org/ebooks/30155) as kindly organized and made available free by [Project Gutenberg](http://www.gutenberg.org/wiki/Main_Page).


## License

(C) Sayanee Basu 2014, released under an MIT license
