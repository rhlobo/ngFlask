(function(){

  var app = angular.module( 'app.expenses', [
    'app.expenses.service',
    'app.expenses.create',
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
    '$stateParams',
    '$state',
    function( $scope, ExpenseService, $filter, NgTableParams, $stateParams, $state ) {

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
          $scope.changeSelection();
        });
      };

      /**
       * Request the detail view of an expense
       */
      $scope.createExpense = function() {
        $state.go('expenses_create', $stateParams);
      };

      /**
       * Request the edition view of an expense
       */
      $scope.editExpense = function(expense) {
        $stateParams.exid = expense.id;
        $stateParams.expense = expense;
        $state.go('expenses_edit', $stateParams);
      };

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
       * Updates the expense selection
       */
      $scope.changeSelection = function(expense) {
        current = null;
        $scope.expenses.forEach(function(e, i){
          if (e.$selected) {
            e.$selected = false;
            current = e;
          }
        });

        if (!expense) {
          if (current) {
            expense = current;
          } else if ($scope.expenses.length > 0) {
            expense = $scope.expenses[expenses.length - 1];
          }
        }

        if (expense) {
          expense.$selected = true;
        }
        $scope.selected = expense;
      };

      $scope.loadExpenses();
    }
  ]);

})();