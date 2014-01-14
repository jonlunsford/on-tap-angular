onTapControllers.controller("vendorsController", [
  "$scope",
  "Restangular",
  "storage",

  function vendorsController($scope, Restangular, storage) {
    $scope.userId = storage.get("user_id");
    currentUser = Restangular.one("users", $scope.userId);
    getRequest = currentUser.get({auth_token: storage.get("auth_token")});

    getRequest.then(function(user) {
      $scope.user = user;
      $scope.userName = user.name;
      $scope.userEmail = user.email;
      $scope.userDescription = user.description;
      $scope.userEstablished = user.established;
      $scope.userWebsite = user.website;
      $scope.userAddressLineOne = user.address_line_one;
      $scope.userAddressLineTwo = user.address_line_two;
    });

    $scope.saveUserInfo = function() {
      console.log("SUBMIT");
      var userInfo = {
        name: $scope.userName,
        email: $scope.userEmail,
        description: $scope.userDescription,
        established: $scope.userEstablished,
        website: $scope.userWebsite,
        address_line_one: $scope.userAddressLineOne,
        address_line_two: $scope.userAddressLineTwo
      };

      currentUser.put({user: userInfo, auth_token: storage.get("auth_token")});
      currentUser.then(function(user) {
        console.log(user);
      });
    };
  }
]);