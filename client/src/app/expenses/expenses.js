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

      $scope.expenses = [];
      function load() {
        ExpenseService.query(function(expenses){
          $scope.expenses = expenses;
        });
      }

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
      $scope.$watch("expenses", function () {
        $scope.tableParams.reload();
      });

      $scope.createExpense = function() {
      };
      $scope.editExpense = function(expense) {
      };
      $scope.deleteExpense = function(expense) {
        if (confirm('Really delete this?')) {
          expense.$delete(function(u, getResponseHeaders){
            load();
          });
        }
      };

      load();
    }
  ]);

})();