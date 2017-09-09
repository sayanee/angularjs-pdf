export const NgPdf = ($window, $document, $log) => {
  'ngInject';

  const backingScale = canvas => {
    const ctx = canvas.getContext('2d');
    const dpr = $window.devicePixelRatio || 1;
    const bsr = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
  };

  const setCanvasDimensions = (canvas, w, h) => {
    const ratio = backingScale(canvas);
    canvas.width = Math.floor(w * ratio);
    canvas.height = Math.floor(h * ratio);
    canvas.style.width = `${Math.floor(w)}px`;
    canvas.style.height = `${Math.floor(h)}px`;
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    return canvas;
  };

  const initCanvas = (element, canvas) => {
    angular.element(canvas).addClass('rotate0');
    element.append(canvas);
  };

  return {
    restrict: 'E',
    scope: {
      pdf: '='
    },
    link(scope, element, attrs) {
      let renderTask = null;
      let pdfLoaderTask = null;
      let debug = false;
      let httpHeaders = scope.pdf.options.httpHeaders;
      let limitHeight = attrs.limitcanvasheight === '1';
      let pdfDoc = null;
      // let pageToDisplay = isFinite(attrs.page) ? parseInt(attrs.page) : 1;
      let pageToDisplay = scope.pdf.options.currentPage;
      let canvas = $document[0].createElement('canvas');
      initCanvas(element, canvas);
      let creds = scope.pdf.options.useCredentials;
      debug = attrs.hasOwnProperty('debug') ? attrs.debug : false;

      let ctx = canvas.getContext('2d');
      let windowEl = angular.element($window);

      element.css('display', 'block');

      windowEl.on('scroll', () => {
        scope.$apply(() => {
          scope.scroll = windowEl[0].scrollY;
        });
      });

      PDFJS.disableWorker = true;

      renderPDF()

      const renderPage = num => {
        if (renderTask) {
          renderTask._internalRenderTask.cancel();
        }

        pdfDoc.getPage(num).then(page => {
          let viewport;
          let pageWidthScale;
          let renderContext;

          if (scope.pdf.options.fitToPage) {
            viewport = page.getViewport(1);
            const clientRect = element[0].getBoundingClientRect();
            pageWidthScale = clientRect.width / viewport.width;
            if (limitHeight) {
              pageWidthScale = Math.min(pageWidthScale, clientRect.height / viewport.height);
            }
            scope.pdf.options.scale = pageWidthScale;
          }
          viewport = page.getViewport(scope.pdf.options.scale);

          setCanvasDimensions(canvas, viewport.width, viewport.height);

          renderContext = {
            canvasContext: ctx,
            viewport
          };

          renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
            if (angular.isFunction(scope.onPageRender)) {
              scope.onPageRender();
            }
          }).catch(reason => {
            $log.log(reason);
          });
        });
      };

      scope.changePage = () => {
        renderPage(scope.pageToDisplay);
      };

      scope.rotate = () => {
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

      function clearCanvas() {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      function renderPDF() {
        clearCanvas();

        let params = {
          'url': scope.pdf.url(),
          'withCredentials': creds
        };

        if (httpHeaders) {
          params.httpHeaders = httpHeaders;
        }

        if (scope.pdf.url() && scope.pdf.url().length) {
          pdfLoaderTask = PDFJS.getDocument(params);
          pdfLoaderTask.onProgress = scope.onProgress;
          pdfLoaderTask.onPassword = scope.onPassword;
          pdfLoaderTask.then(
            _pdfDoc => {
              if (angular.isFunction(scope.onLoad)) {
                scope.onLoad();
              }

              pdfDoc = _pdfDoc;
              renderPage(scope.pageToDisplay);

              scope.$apply(() => {
                scope.pageCount = _pdfDoc.numPages;
                scope.pdf.options.pageCount = _pdfDoc.numPages;
              });
            }, error => {
              if (error) {
                if (angular.isFunction(scope.onError)) {
                  scope.onError(error);
                }
              }
            }
          );
        }
      }

      scope.$watch(() => { return scope.pdf.options.currentPage }, (newVal) => {
        scope.pageToDisplay = parseInt(newVal);
        if (pdfDoc !== null) {
          renderPage(scope.pageToDisplay);
        }
      });

      scope.$watch(() => { return scope.pdf.options.scale }, (newVal) => {
        scope.pageToDisplay = parseInt(scope.pdf.options.currentPage);
        if (pdfDoc !== null) {
          renderPage(scope.pageToDisplay);
        }
      });

      scope.$watch(() => { return scope.pdf.options.fitToPage }, (newVal) => {
        scope.pageToDisplay = parseInt(scope.pdf.options.currentPage);
        if (newVal && pdfDoc !== null) {
          renderPage(scope.pageToDisplay);
        }
      });
    }
  }
}
