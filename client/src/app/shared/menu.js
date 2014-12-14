(function(){

  var app = angular.module( 'app.menu', []);

  app.directive('menu', [function () {
    return {
      restrict: 'E',
      templateUrl: 'shared/menu.tpl.html'
    };
  }]);

})();