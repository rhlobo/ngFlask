(function(){

  var app = angular.module( 'ngBoilerplate.expenses', [
    'ui.router',
    'ngResource'
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
    var ExpensesAPI = $resource('/api/expense/:id', { id: '@id' }, {
      'load':  {
        method: 'GET',
        isArray: true,
        transformResponse: function(data, headersGetter) {
          return (data && data.objects) ? data.objects : data;
        }
      }
    });

    ExpensesAPI.load(function(expenses){
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

  var expense_list = [{
    "amount": 9.99,
    "comment": null,
    "date_time": "2014-12-11T14:55:45.327792",
    "description": "x1",
    "id": 1
  },
  {
    "amount": 6.66,
    "comment": null,
    "date_time": "2015-01-01T12:00:00",
    "description": "x2",
    "id": 2
  }];

})();