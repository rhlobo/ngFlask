/* jshint -W116 */
(function(){

  var app = angular.module( 'app.expenses.create', [
    'app.expenses.service',
    'ui.bootstrap.datetimepicker',
    'ui.router'
  ]);

  app.config(function config( $stateProvider ) {

    $stateProvider.state( 'expenses_create', {
      url: '/expense/new',
      views: {
        "main": {
          controller: 'ExpenseEditCtrl',
          templateUrl: 'expenses/expense.tpl.html'
        }
      },
      data:{ pageTitle: 'Expenses' }
    });

    $stateProvider.state( 'expenses_edit', {
      url: '/expense/edit/:exid',
      views: {
        "main": {
          controller: 'ExpenseEditCtrl',
          templateUrl: 'expenses/expense.tpl.html'
        }
      },
      data:{ pageTitle: 'Expenses' }
    });
  });

  app.controller( 'ExpenseEditCtrl', [
    '$scope',
    'ExpenseService',
    '$stateParams',
    '$state',
    function( $scope, ExpenseService, $stateParams, $state ) {

    // Loading the expense model
    $scope.expense = new ExpenseService();
    if ($stateParams.expense) $scope.expense = $stateParams.expense;
    else if ($stateParams.exid) $scope.expense = ExpenseService.get({ id: $stateParams.exid });

    /**
     * Directs to expense listing page
     */
    $scope.listExpenses = function() {
      $state.go('expenses', $stateParams);
    };

    /**
     * Saves an expense
     */
    $scope.saveExpense = function(expense) {
      function success(expense){
        $stateParams.expense = expense;
        $state.go('expenses', $stateParams);
      }

      if (expense.id) $scope.expense.$update({ id: expense.id }, success);
      else $scope.expense.$save(success);
    };

  }]);

})();