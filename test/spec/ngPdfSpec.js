describe('ngPdf', function() {
  console.log = function() {};
  var element, $scope;

  // Load the myApp module, which contains the directive
  beforeEach(module('App'));

  beforeEach(module('my.templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    var $compile = _$compile_;
    var $rootScope = _$rootScope_;
    var $document = _$document_;
    $scope = $rootScope.$new();
    // Compile a piece of HTML containing the directive
    var html = '<ng-pdf template-url="partials/viewer.html" canvasid="pdf" scale="page-fit" page=13></ng-pdf>';
    var elmnt = angular.element(html);
    $document.find('body').append(elmnt);
    element = $compile(elmnt)($scope);
    $scope.pdfUrl = '/pdf/relativity.pdf';
    $scope.$digest();
  }));

  beforeEach(function(done){
    setTimeout(function() {
      done();
    }, 9000);
  }, 10000);

  it('ng-pdf must have 1 canvas', function() {
    var canvas = element.find('canvas');
    expect(canvas.length).toBe(1);
  });

  it('goNext and goPrevious change page', function(){
    expect($scope.pageNum).toBe(13);
    $scope.goPrevious();
    expect($scope.pageNum).toBe(12);
    $scope.goNext();
    expect($scope.pageNum).toBe(13);
  });

  it('zoomIn increase the scale by 0.2', function() {
    var scale = $scope.zoomIn();
    var zoomed_scale = $scope.zoomIn();
    expect(zoomed_scale - scale).toBeCloseTo(0.2);
  });

  it('zoomOut decrease the scale by 0.2', function() {
    var scale = $scope.zoomOut();
    var zoomed_scale = $scope.zoomOut();
    expect(zoomed_scale - scale).toBeCloseTo(-0.2);
  });
});

describe('ngPdf protected', function() {
  console.log = function() {};
  var element, $scope;

  // Load the myApp module, which contains the directive
  beforeEach(module('App'));

  beforeEach(module('my.templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$document_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    var $compile = _$compile_;
    var $rootScope = _$rootScope_;
    var $document = _$document_;
    $scope = $rootScope.$new();
    // Compile a piece of HTML containing the directive
    var html = '<ng-pdf template-url="partials/viewer.html" canvasid="pdf" scale="page-fit" page=13></ng-pdf>';
    var elmnt = angular.element(html);
    $document.find('body').append(elmnt);
    element = $compile(elmnt)($scope);
    $scope.pdfUrl = '/pdf/relativity.protected.pdf';
    $scope.onPassword = jasmine.createSpy('onPassword');
    $scope.$digest();
  }));

  beforeEach(function(done){
    setTimeout(function() {
      done();
    }, 9000);
  }, 10000);

  it('should call onPassword function', function() {
    expect($scope.onPassword).toHaveBeenCalled();
  });
});
