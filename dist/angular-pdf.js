/*! Angular-PDF Version: 0.3.9 | (C) Sayanee Basu 2014, released under an MIT license */
(function() {

  'use strict';

  angular.module('pdf', []).directive('ngPdf', [ '$window', function($window) {
    return {
      restrict: 'E',
      templateUrl: function(element, attr) {
        return attr.templateUrl ? attr.templateUrl : 'partials/viewer.html'
      },
      link: function(scope, element, attrs) {
        var src = scope.src,
          pdfDoc = null,
          pageNum = (attrs.pageNum ? attrs.pageNum : 1),
          scale = (attrs.scale ? attrs.scale : 1),
          canvas = (attrs.canvasid ? document.getElementById(attrs.canvasid) : document.getElementById('pdf-canvas')),
          ctx = canvas.getContext('2d'),
          windowEl = angular.element($window);

        windowEl.on('scroll', function() {
          scope.$apply(function() {
            scope.scroll = windowEl[0].scrollY;
          });
        });

        PDFJS.disableWorker = true;
        scope.pageNum = pageNum;

        scope.renderPage = function(num) {
          pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport(scale),
              renderContext = {};

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };

            page.render(renderContext);
          });
        };

        scope.goPrevious = function() {
          if (scope.pageToDisplay <= 1) {
            return;
          }
          scope.pageNum = parseInt(scope.pageNum) - 1;
        };

        scope.goNext = function() {
          if (scope.pageToDisplay >= pdfDoc.numPages) {
            return;
          }
          scope.pageNum = parseInt(scope.pageNum) + 1;
        };

        scope.zoomIn = function() {
          scale = parseFloat(scale) + 0.2;
          scope.renderPage(scope.pageToDisplay);
          return scale;
        };

        scope.zoomOut = function() {
          scale = parseFloat(scale) - 0.2;
          scope.renderPage(scope.pageToDisplay);
          return scale;
        };

        scope.changePage = function() {
          scope.renderPage(scope.pageToDisplay);
        };

        scope.rotate = function() {
          if (canvas.getAttribute('class') === 'rotate0') {
            canvas.setAttribute('class', 'rotate90');
          } else if (canvas.getAttribute('class') === 'rotate90') {
            canvas.setAttribute('class', 'rotate180');
          } else if (canvas.getAttribute('class') === 'rotate180') {
            canvas.setAttribute('class', 'rotate270');
          } else {
            canvas.setAttribute('class', 'rotate0');
          }
        };

        PDFJS.getDocument(src, null, null, scope.onProgress).then(
          function(_pdfDoc) {
            if (typeof scope.onLoad === 'function' ) {
              scope.onLoad();
            }

            pdfDoc = _pdfDoc;
            scope.renderPage(scope.pageToDisplay);

            scope.$apply(function() {
              scope.pageCount = _pdfDoc.numPages;
            });
          }, function(error) {
            if (error) {
              if (typeof scope.onError === 'function') {
                scope.onError(error);
              }
            }
          }
        );

        scope.$watch('pageNum', function(newVal) {
          scope.pageToDisplay = parseInt(newVal);
          if (pdfDoc !== null) {
            scope.renderPage(scope.pageToDisplay);
          }
        });

      }
    };
  } ]);

})();
