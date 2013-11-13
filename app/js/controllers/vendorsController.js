onTapControllers.controller("vendorsController", [
  "$scope",
  "Restangular",
  "storage",

  function vendorsController($scope, Restangular, storage) {
    $scope.userId = storage.get("user_id");
  }
]);