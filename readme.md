# angular-pdf [![Build Status](https://travis-ci.org/sayanee/angularjs-pdf.png)](https://travis-ci.org/sayanee/angularjs-pdf) [![Dependency Status](https://gemnasium.com/sayanee/angularjs-pdf.png)](https://gemnasium.com/sayanee/angularjs-pdf)

Version: 0.2.5

>An [AngularJS](http://angularjs.org/) [directive](http://docs.angularjs.org/guide/directive) `ng-pdf` to display PDF files with [PDFJS](http://mozilla.github.io/pdf.js/).

## Overview [[demo](http://sayan.ee/angularjs-pdf/)]

Integrate PDF files right into web pages.

![Angular PDF](ng-pdf.gif)

##Requirements

1. [AngularJS](http://angularjs.org/) - get the latest [angular.min.js](https://developers.google.com/speed/libraries/devguide#angularjs)
1. [PDFJS](http://mozilla.github.io/pdf.js/) - build the files [`pdf.js` and `pdf.worker.js`](https://github.com/mozilla/pdf.js#building-pdfjs)

###Features

1. next / previous page
1. zoom in / out
1. rotate clockwise
1. jump to a page number
1. when scrolling, the pdf controls will get fixed position at the top
1. define the view template
1. define the path to pdf with scope variable

## Getting Started

1. install or copy over the file `dist/angular-pdf.min.js` or `dist/angular-pdf.js`:

    ```
    bower install angular-pdf
    ```
1. include the path to the lib file in `index.html`:

    ```
    <script src="js/vendor/angular-pdf/dist/angular-pdf.js"></script>
    ```

1. include the lib as a dependency when defining the angular app:

    ```
    var app = angular.module('App', ['pdf']);
    ```
1. include the directive with the following attributes: url, delegate-handle and scale:

    ```
    <div class="wrapper" ng-controller="DocCtrl">
        <ng-pdf delegate-handle="pdf-one" url="pdfUrl" scale="1.5"></ng-pdf>
    </div>
    ```


### Delegate Service

The delegate service allows you to access and control individual instances of a directive. This allows us to have multiple instances of the same directive in the same controller.

1. You can fetch an instance using it's delegate handle. Make sure to inject the `$pdfDelegate` service into your controller:

    ```
    app.controller('DocCtrl', function($scope) {
        $pdfDelegate.get('pdf-one')
            .then(function (_pdf) {
                $scope.pdfOne = _pdf;
            }, $log.error);
    });
    ```

1. **Next / Previous page**

    ```
    $scope.pdfOne.goNext();
    $scope.pdfOne.goPrevious();
    ```

1. **Zoom in / out**

    ```
    pdfOne.zoomIn()
    pdfOne.zoomOut()
    ```

1. **Rotate clockwise**

    ```
    pdfOne.rotate()
    ```

    include the css styles:

    ```
    .rotate0 {-webkit-transform: rotate(0deg); transform: rotate(0deg); }
    .rotate90 {-webkit-transform: rotate(90deg); transform: rotate(90deg); }
    .rotate180 {-webkit-transform: rotate(180deg); transform: rotate(180deg); }
    .rotate270 {-webkit-transform: rotate(270deg); transform: rotate(270deg); }
    ```

1. **Jump to page number**

    ```
    $scope.pdfOne.goToPage(pageNum);
    ```

1. **Get current page number and total page count**

    ```
    $scope.pdfOne.currentPage();
    $scope.pdfOne.getPageCount();
    ```


1. open the file `index.html` with a web server


##Similar projects

1. [ng-pdfviewer](https://github.com/akrennmair/ng-pdfviewer)


##Credit

PDF example used is [Relativity: The Special and General Theory by Albert Einstein](http://www.gutenberg.org/ebooks/30155) as kindly organized and made available free by [Project Gutenberg](http://www.gutenberg.org/wiki/Main_Page).


## License

(C) Sayanee Basu 2014, released under an MIT license
