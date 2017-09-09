app.controller('DocCtrl', function($scope, NgPdfFactory) {

  $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
  $scope.pdfUrl = 'pdf/relativity.pdf';
  $scope.pdfPassword = 'test';
  $scope.scroll = 0;
  $scope.loading = 'loading';
  $scope.changePdfPage = 1;

  $scope.pdfConfig = new NgPdfFactory($scope.pdfUrl, { fitToPage: true });

  $scope.$watch('pdfUrl', (newVal, oldVal) => {
    if (newVal !== '' && newVal !== oldVal) {
      $scope.pdfConfig = new NgPdfFactory(newVal, { fitToPage: true });
    }
  });

  $scope.$watch('changePdfPage', (newVal, oldVal) => {
    if (newVal !== '' && newVal !== oldVal) {
      $scope.pdfConfig.goToPage(newVal)
    }
  });

  $scope.$watch(() => { return $scope.pdfConfig.currentPage }, (newVal, oldVal) => {
    if (newVal !== '' && newVal !== oldVal) {
      $scope.changePdfPage = newVal;
    }
  });



  $scope.getNavStyle = function(scroll) {
    if(scroll > 100) return 'pdf-controls fixed';
    else return 'pdf-controls';
  }

  $scope.onPdfLoadingSuccess = function() {
    console.log('pdf loaded')
  };

  $scope.onPdfLoadingProgress = function (progressData) {
    console.log('pdf loading on progress', progressData);
  };

  $scope.onPdfLoadingError = function(error) {
    console.log('pdf loading error', error);
  };

  $scope.onPassword = function (updatePasswordFn, passwordResponse) {
    if (passwordResponse === PDFJS.PasswordResponses.NEED_PASSWORD) {
        updatePasswordFn($scope.pdfPassword);
    } else if (passwordResponse === PDFJS.PasswordResponses.INCORRECT_PASSWORD) {
        console.log('Incorrect password')
    }
  };

});
