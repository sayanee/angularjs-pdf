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

    this.url = () => {
      return this.options.url
    }

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

    this.zoomIn = () => {
      this.options.fitToPage = false;
      this.options.scale = parseFloat(this.options.scale) + 0.2
    };

    this.zoomOut = () => {
      this.options.fitToPage = false;
      this.options.scale = parseFloat(this.options.scale) - 0.2
    };

    this.fit = () => {
      this.options.fitToPage = true;
    }
  };
}
