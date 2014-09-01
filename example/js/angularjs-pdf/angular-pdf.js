/*! Angular-PDF Version: 0.2.5 | (C) Sayanee Basu 2014, released under an MIT license */
(function () {

  'use strict';

  angular.module('pdf', []).directive('ngPdf', function($window, $log, $pdfDelegate) {
    return {
      restrict: 'E',
      template: '<canvas class="rotate0"></canvas>',
      scope: true,
      link: function (scope, element, attrs) {
        var url = scope.$eval(attrs.url),
          pdfDoc = null,
          pageNum = 1,
          scale = (attrs.scale ? attrs.scale : 1),
          canvas = element.find('canvas')[0],
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
            var viewport = page.getViewport(scale);
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };

            page.render(renderContext);

          });

        };

        scope.goPrevious = function() {
          if (scope.pageNum <= 1)
            return;
          scope.pageNum = parseInt(scope.pageNum, 10) - 1;
          scope.renderPage(scope.pageNum);
        };

        scope.goNext = function() {
          if (scope.pageNum >= pdfDoc.numPages)
            return;
          scope.pageNum = parseInt(scope.pageNum, 10) + 1;
          scope.renderPage(scope.pageNum);
        };

        scope.zoomIn = function() {
          scale = parseFloat(scale) + 0.2;
          scope.renderPage(scope.pageNum);
          return scale;
        };

        scope.zoomOut = function() {
          scale = parseFloat(scale) - 0.2;
          scope.renderPage(scope.pageNum);
          return scale;
        };

        scope.changePage = function() {
          scope.renderPage(scope.pageNum);
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

        PDFJS.getDocument(url).then(function (_pdfDoc) {
          pdfDoc = _pdfDoc;
          scope.renderPage(scope.pageNum);

          scope.$apply(function() {
            scope.pageCount = _pdfDoc.numPages;
            $pdfDelegate.register(scope, attrs.delegateHandle);
          });
        }, $log.error);

        scope.getPageCount = function() {
          return scope.pageCount;
        };

        scope.currentPage = function () {
          return scope.pageNum;
        };

        scope.goToPage = function(newVal) {
          if (pdfDoc !== null) {
            scope.pageNum = newVal;
            scope.renderPage(newVal);
          }
        };

        scope.$on('$destroy', function () {
          $pdfDelegate.unregister(attrs.delegateHandle);
        });

      }
    };
  });

})();
