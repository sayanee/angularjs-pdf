app.controller('DocCtrl', function($scope, $window) {

  $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
  $scope.pdfUrl = 'pdf/relativity.pdf';
  $scope.pdfPassword = 'test';
  $scope.scroll = 0;
  $scope.loading = 'loading';

  $scope.page = 14;

  $scope.swipeLeft = function () {
    $scope.goNext();
  }
  $scope.swipeRight = function () {
    $scope.goPrevious();
  }

  angular.element($window).bind('resize', function() {
    // TODO: resizing makes pdf.js run the function InternalRenderTask_cancel(). not sure what that means exactly.
    $scope.fit();
  });

  // $scope.getNavStyle = function(scroll) {
  //   if(scroll > 100) return 'pdf-controls fixed';
  //   else return 'pdf-controls';
  // }

  $scope.onError = function(error) {
    console.log('error', error);
  }

  $scope.onLoad = function() {
    $scope.loading = '';
  }

  $scope.onProgress = function (progressData) {
    // console.log(progressData);
  };

  $scope.onPassword = function (updatePasswordFn, passwordResponse) {
    if (passwordResponse === PDFJS.PasswordResponses.NEED_PASSWORD) {
        updatePasswordFn($scope.pdfPassword);
    } else if (passwordResponse === PDFJS.PasswordResponses.INCORRECT_PASSWORD) {
        console.log('Incorrect password')
    }
  };

});
