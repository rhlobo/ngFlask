(function(){

  var app = angular.module( 'app', [
    'ui.router',
    'templates-app',
    'templates-common',
    'app.home',
    'app.expenses',
    'app.about',
    'app.menu'
  ]);

  app.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/home' );
  });

  app.run( function run () {});

  app.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if ( angular.isDefined( toState.data.pageTitle ) ) {
        $scope.pageTitle = toState.data.pageTitle;
      }
    });
  });

})();