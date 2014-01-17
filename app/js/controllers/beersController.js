onTapControllers.controller("beersController", [
  "$scope",
  "$routeParams",
  "Restangular",
  "storage",
  "$navigate",

  function beersController($scope, $routeParams, Restangular, storage, $navigate) {
    $scope.$navigate = $navigate;
    $scope.userId = storage.get("user_id")
    
    $scope.getVendorBeers = function() {
      getRequest = Restangular.one("users", $scope.userId).one("beers").get({auth_token: storage.get("auth_token")})
      getRequest.then(function(results) {
        $scope.beers = results;
      });
    };

    $scope.getBeer = function(id) {
      getRequest = Restangular.one("users", $scope.userId).one("beers", id).get({auth_token: storage.get("auth_token")});
      getRequest.then(function(result) {
        $scope.beer = result;
      });
    };

    if($routeParams.beer_id) {
      $scope.getBeer($routeParams.beer_id);
    } else {
      $scope.getVendorBeers();
    }
  }
]);