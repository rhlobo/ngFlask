(function(){

  var app = angular.module( 'ngBoilerplate.expenses', [
    'app.expenses.service',
    'ui.router',
    'ngTable'
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

  app.controller( 'ExpensesCtrl', [
    '$scope',
    'ExpenseService',
    '$filter',
    'ngTableParams',
    function( $scope, ExpenseService, $filter, NgTableParams ) {

      // Expense list
      $scope.expenses = [];

      // Configuring expense listing (ngTable)
      $scope.tableParams = new NgTableParams({
        page: 1,
        count: 100,
        filter: { description: '' },
        sorting: { date_time: 'desc' }
      }, {
        total: $scope.expenses.length,
        getData: function($defer, params) {
          var filteredData = params.filter() ? $filter('filter')($scope.expenses, params.filter()) : $scope.expenses;
          var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : $scope.expenses;
          params.total(orderedData.length);
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });

      /**
       * Loads the expense list
       */
      $scope.loadExpenses = function() {
        ExpenseService.query(function(expenses){
          $scope.expenses = expenses;
          $scope.tableParams.reload();
          if (expenses.length > 0) {
            $scope.changeSelection($scope.expenses[0]);
          }
        });
      };

      /**
       * Request the detail view of an expense
       */
      $scope.createExpense = function() {};

      /**
       * Request the edition view of an expense
       */
      $scope.editExpense = function(expense) {};

      /**
       * Deletes an expense
       */
      $scope.deleteExpense = function(expense) {
        if (confirm('Really delete this?')) {
          expense.$delete(function(u, getResponseHeaders){
            $scope.loadExpenses();
          });
        }
      };

      /**
       * Change the expense selection
       */
      $scope.changeSelection = function(expense) {
        $scope.expenses.forEach(function(e, i){
          e.$selected = false;
        });
        if (expense) {
          expense.$selected = true;
        }
      };

      $scope.loadExpenses();
    }
  ]);

})();