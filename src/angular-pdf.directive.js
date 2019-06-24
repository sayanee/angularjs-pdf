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

  const onPassword = function (password, incorrectPasswordCallback) {
    return function (updatePasswordFn, passwordResponse) {
      switch (passwordResponse) {
        case PDFJS.PasswordResponses.NEED_PASSWORD:
          updatePasswordFn(password);
          break;
        case PDFJS.PasswordResponses.INCORRECT_PASSWORD:
          incorrectPasswordCallback();
          break;
      }
    };
  };

  return {
    restrict: 'E',
    scope: {
      pdf: '=',
      onError: '&',
      onProgress: '&',
      onSuccess: '&',
      onIncorrectPassword: '&'
    },
    link(scope, element, attrs) {
      let renderTask = null;
      let pdfLoaderTask = null;
      let debug = false;
      let httpHeaders = scope.pdf.httpHeaders;
      let limitHeight = attrs.limitcanvasheight === '1';
      let pdfDoc = null;
      let pageToDisplay = scope.pdf.currentPage;
      let canvas = $document[0].createElement('canvas');
      initCanvas(element, canvas);
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
      scope.$watch(() => scope.pdf, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          renderPDF();
        }
      });

      const renderPage = num => {
        if (pdfDoc === null) {
          console.warn("pdfDoc is null")
          return;
        }
        if (renderTask) {
          renderTask._internalRenderTask.cancel();
        }

        pdfDoc.getPage(num).then(page => {
          let viewport;
          let pageWidthScale;
          let renderContext;

          if (scope.pdf.fitToPage) {
            viewport = page.getViewport(1);
            const clientRect = element[0].getBoundingClientRect();
            pageWidthScale = clientRect.width / viewport.width;
            if (limitHeight) {
              pageWidthScale = Math.min(pageWidthScale, clientRect.height / viewport.height);
            }
            scope.pdf.scale = pageWidthScale;
          }
          viewport = page.getViewport(scope.pdf.scale);

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

      function clearCanvas() {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      function renderPDF() {
        clearCanvas();

        let params = {
          'url': scope.pdf.url,
          'withCredentials': scope.pdf.useCredentials
        };

        // if (httpHeaders) {
        //   params.httpHeaders = httpHeaders;
        // }

        if (scope.pdf.url && scope.pdf.url.length) {
          pdfLoaderTask = PDFJS.getDocument(params);
          pdfLoaderTask.onProgress = scope.onProgress;
          pdfLoaderTask.onPassword = onPassword(scope.pdf.password, scope.onIncorrectPassword);
          pdfLoaderTask.then(
            _pdfDoc => {
              run_success_hook()

              pdfDoc = _pdfDoc;
              renderPage(scope.pdf.currentPage);

              scope.$apply(() => {
                scope.pdf.pageCount = _pdfDoc.numPages;
              });
            }, error => {
              run_error_hook(error)
            }
          );
        }
      }

      scope.$watch(() => { return scope.pdf.currentPage }, () => {
        renderPage(scope.pdf.currentPage);
      });

      scope.$watch(() => { return scope.pdf.scale }, () => {
        renderPage(scope.pdf.currentPage);
      });

      scope.$watch(() => { return scope.pdf.fitToPage }, (newVal) => {
        if (newVal === true) {
          renderPage(scope.pdf.currentPage);
        }
      });

      scope.$watch(() => { return scope.pdf.rotation }, (newVal) => {
        canvas.setAttribute('class', 'rotate'+parseInt(newVal));
      })

      const run_success_hook = () => {
        if (angular.isFunction(scope.onSuccess)) {
          scope.onSuccess();
        }
      };

      const run_error_hook = (error) => {
        if (angular.isFunction(scope.onError)) {
          scope.onError(error);
        }
      };
    }
  }
}
