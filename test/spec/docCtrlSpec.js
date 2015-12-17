describe('docCtrl', function() {
  beforeEach(module('App'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  describe('$scope.getNavStyle', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = $controller('DocCtrl', { $scope: $scope });
    });

    it('return "pdf-controls fixed" classes if the scroll is > 100', function() {
      var navStyle = $scope.getNavStyle(101);
      expect(navStyle).toEqual('pdf-controls fixed');
    });

    it('return "pdf-controls" class if the scroll is < 100', function() {
        var navStyle = $scope.getNavStyle(99);
        expect(navStyle).toEqual('pdf-controls');
    });
  });
});
