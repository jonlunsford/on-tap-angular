onTapControllers.controller("vendorsController", [
  "$scope",
  "Restangular",
  "storage",
  "flash",
  "sessionService",
  "$navigate",

  function vendorsController($scope, Restangular, storage, flash, sessionService, $navigate) {
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
      var userInfo = {
        name: $scope.userName,
        email: $scope.userEmail,
        description: $scope.userDescription,
        established: $scope.userEstablished,
        website: $scope.userWebsite,
        address_line_one: $scope.userAddressLineOne,
        address_line_two: $scope.userAddressLineTwo
      };

      putRequest = currentUser.customPUT({user: userInfo, auth_token: storage.get("auth_token")});
      putRequest.then(function(user) {
        flash("Profile updated successfully!");
        $scope.hideFlashes();
      });
    };

    $scope.signOut = function() {
      sessionService.destroySession();
      flash("Signed out successfully");
      $navigate.go("/");
    };
  }
]);