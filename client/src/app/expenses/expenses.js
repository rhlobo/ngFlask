(function(){

  var app = angular.module( 'ngBoilerplate.expenses', [
    'ui.router',
    'restlessResource'
  ]);

  app.config(function config( $stateProvider ) {
    $stateProvider.state( 'expenses', {
      url: '/expense',
      views: {
        "main": {
          controller: 'ExpensesCtrl',
          templateUrl: 'expenses/expenses.tpl.html'
        }
      },
      data:{ pageTitle: 'Expenses' }
    });
  });

  app.controller( 'ExpensesCtrl', [ '$scope', '$resource', function( $scope, $resource ) {
    var ExpensesAPI = $resource('/api/expense/:id', { id: '@id' });

    ExpensesAPI.query(function(expenses){
      $scope.expenses = expenses;
    });

    $scope.createExpense = function() {
      alert('Create new');
    };
    $scope.editExpense = function(id) {
      alert('Edit ' + id);
    };
    $scope.deleteExpense = function(id) {
      alert('Delete ' + id);
    };
  }]);

})();