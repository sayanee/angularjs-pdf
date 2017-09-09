export const NgPdfFactory = function () {
  'ngInject';

  const defaultOptions = {
    currentPage: 1,
    fitToPage: false,
    httpHeaders: null,
    url: null,
    scale: 1,
    useCredentials: false,
    rotation: 0,
    pageCount: null,
  };

  return function (opts) {
    this.options = Object.assign({}, defaultOptions, opts);

    this.goPrevious = () => {
      if (this.options.currentPage <= 1) {
        return;
      }
      this.options.currentPage -= 1;
    };

    this.goNext = () => {
      if (this.options.currentPage >= this.options.pageCount) {
        return;
      }
      this.options.currentPage += 1;
    };
  };
}
