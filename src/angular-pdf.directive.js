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
    templateUrl(element, attr) {
      return attr.templateUrl ? attr.templateUrl : 'partials/viewer.html';
    },
    link(scope, element, attrs) {
      let renderTask = null;
      let pdfLoaderTask = null;
      let debug = false;
      let url = scope.pdfUrl;
      let httpHeaders = scope.httpHeaders;
      let pdfDoc = null;
      let pageToDisplay = isFinite(attrs.page) ? parseInt(attrs.page) : 1;
      let pageFit = attrs.scale === 'page-fit';
      let limitHeight = attrs.limitcanvasheight === '1';
      let scale = attrs.scale > 0 ? attrs.scale : 1;
      let canvas = $document[0].createElement('canvas');
      initCanvas(element, canvas);
      let creds = attrs.usecredentials;
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
      scope.pageNum = pageToDisplay;

      scope.renderPage = num => {
        if (renderTask) {
          renderTask._internalRenderTask.cancel();
        }

        pdfDoc.getPage(num).then(page => {
          let viewport;
          let pageWidthScale;
          let renderContext;

          if (pageFit) {
            viewport = page.getViewport(1);
            const clientRect = element[0].getBoundingClientRect();
            pageWidthScale = clientRect.width / viewport.width;
            if (limitHeight) {
              pageWidthScale = Math.min(pageWidthScale, clientRect.height / viewport.height);
            }
            scale = pageWidthScale;
          }
          viewport = page.getViewport(scale);

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

      scope.goPrevious = () => {
        if (scope.pageToDisplay <= 1) {
          return;
        }
        scope.pageToDisplay = parseInt(scope.pageToDisplay) - 1;
        scope.pageNum = scope.pageToDisplay;
      };

      scope.goNext = () => {
        if (scope.pageToDisplay >= pdfDoc.numPages) {
          return;
        }
        scope.pageToDisplay = parseInt(scope.pageToDisplay) + 1;
        scope.pageNum = scope.pageToDisplay;
      };

      scope.zoomIn = () => {
        pageFit = false;
        scale = parseFloat(scale) + 0.2;
        scope.renderPage(scope.pageToDisplay);
        return scale;
      };

      scope.zoomOut = () => {
        pageFit = false;
        scale = parseFloat(scale) - 0.2;
        scope.renderPage(scope.pageToDisplay);
        return scale;
      };

      scope.fit = () => {
        pageFit = true;
        scope.renderPage(scope.pageToDisplay);
      }

      scope.changePage = () => {
        scope.renderPage(scope.pageToDisplay);
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
          'url': url,
          'withCredentials': creds
        };

        if (httpHeaders) {
          params.httpHeaders = httpHeaders;
        }

        if (url && url.length) {
          pdfLoaderTask = PDFJS.getDocument(params);
          pdfLoaderTask.onProgress = scope.onProgress;
          pdfLoaderTask.onPassword = scope.onPassword;
          pdfLoaderTask.then(
            _pdfDoc => {
              if (angular.isFunction(scope.onLoad)) {
                scope.onLoad();
              }

              pdfDoc = _pdfDoc;
              scope.renderPage(scope.pageToDisplay);

              scope.$apply(() => {
                scope.pageCount = _pdfDoc.numPages;
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

      scope.$watch('pageNum', newVal => {
        scope.pageToDisplay = parseInt(newVal);
        if (pdfDoc !== null) {
          scope.renderPage(scope.pageToDisplay);
        }
      });

      scope.$watch('pdfUrl', newVal => {
        if (newVal !== '') {
          if (debug) {
            $log.log('pdfUrl value change detected: ', scope.pdfUrl);
          }
          url = newVal;
          scope.pageNum = scope.pageToDisplay = pageToDisplay;
          if (pdfLoaderTask) {
            pdfLoaderTask.destroy().then(() => {
              renderPDF();
            });
          } else {
            renderPDF();
          }
        }
      });
    }
  }
}
