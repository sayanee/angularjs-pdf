/*! Angular-PDF Version: 0.2.5 | (C) Sayanee Basu 2014, released under an MIT license */
(function () {

  angular.module('pdf')
    .provider('$pdfDelegate', function() {

      var self = this;
      self.DEFAULT_PDF_ID = '__DEFAULT_PDF_ID__';

      this.$get = ['$q', function($q) {

        var pdfStore = {},
            exports = {},
            initStoreForId,
            resolveInStoreById;

        exports.get = function(id) {
          var id = id || self.DEFAULT_PDF_ID;
          if(!pdfStore.hasOwnProperty(id)) {
            initStoreForId(id);
          }
          return pdfStore[id].deferred.promise;
        };

        exports.register = function(pdf, _id) {
          var id = _id || self.DEFAULT_PDF_ID;
          if(!pdfStore.hasOwnProperty(id)) {
            initStoreForId(id);
          }
          if(pdfStore[id].isResolved) {
            initStoreForId(id);
          }
          resolveInStoreById(pdf, id);
        };

        exports.unregister = function(_id) {
          var id = _id || self.DEFAULT_PDF_ID;
          if(pdfStore.hasOwnProperty(id)) {
            delete pdfStore[id];
          }
        };

        initStoreForId = function(id) {
          pdfStore[id] = {
            deferred: $q.defer(),
            isResolved: false
          };
        };

        resolveInStoreById = function(pdf, id) {
          pdfStore[id].deferred.resolve(pdf);
          pdfStore[id].isResolved = true;
        };

        return exports;
      }];

      return this;

    });
})();
