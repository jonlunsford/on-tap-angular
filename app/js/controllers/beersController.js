onTapControllers.controller("beersController", [
  "$scope",
  "$routeParams",
  "Restangular",
  "storage",

  function beersController($scope, $routeParams, Restangular, storage) {

    $scope.getVendorBeers = function() {
      getRequest = Restangular.one("users", storage.get("user_id")).one("beers").get({auth_token: storage.get("auth_token")})
      getRequest.then(function(results) {
        $scope.beers = results;
      });
    };

    $scope.getVendorBeers();
  }
]);