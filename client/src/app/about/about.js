(function(){

  var app = angular.module( 'ngBoilerplate.about', [
    'ui.router',
    'placeholders',
    'ui.bootstrap'
  ]);

  app.config(function config( $stateProvider ) {
    $stateProvider.state( 'about', {
      url: '/about',
      views: {
        "main": {
          controller: 'AboutCtrl',
          templateUrl: 'about/about.tpl.html'
        }
      },
      data:{ pageTitle: 'What is It?' }
    });
  });

  app.controller( 'AboutCtrl', function AboutCtrl( $scope ) {});

})();