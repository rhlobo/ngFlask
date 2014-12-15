(function(){

  var app = angular.module( 'app.expenses.service', [
    'restlessResource'
  ]);

  app.factory('ExpenseService', ['$resource', function($resource){
    return $resource('/api/expense/:id', { id: '@id' });
  }]);

})();