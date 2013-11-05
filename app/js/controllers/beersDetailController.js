onTapControllers.controller("beersDetailController", [
  "$scope", 
  "$routeParams", 
  "Beer", 

  function beersDetailController($scope, $routeParams, Beer) {
    $scope.beer = Beer.get({id: $routeParams.id});

    $scope.setClass = function(value) {
      return value ? "active" : "inactive";
    }
  }
]);