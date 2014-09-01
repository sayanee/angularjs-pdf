app.controller('DocCtrl', function($scope, $pdfDelegate, $log) {

  $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
  $scope.pdfUrl = '/pdf/relativity.pdf';
  $scope.scroll = 0;

  $scope.getNavStyle = function(scroll) {
    if(scroll > 100) return 'pdf-controls fixed';
    else return 'pdf-controls';
  };

  $scope.goToPage = function (pageNum) {
		$scope.pdfOne.goToPage(pageNum);
		$scope.pageNum = $scope.pdfOne.currentPage();
  };

  $scope.next = function () {
		$scope.pdfOne.goNext();
		$scope.pageNum = $scope.pdfOne.currentPage();
  };

  $scope.prev = function () {
		$scope.pdfOne.goPrevious();
		$scope.pageNum = $scope.pdfOne.currentPage();
  };

	$pdfDelegate.get('pdf-one')
  	.then(function (_pdf) {
  		$scope.pdfOne = _pdf;
  		$scope.pageNum = $scope.pdfOne.currentPage();
  		$scope.pageCount = $scope.pdfOne.getPageCount();
  	}, $log.error);
});