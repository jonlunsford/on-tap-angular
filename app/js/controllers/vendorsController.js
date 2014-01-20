onTapControllers.controller("vendorsController", [
  "$scope",
  "Restangular",
  "storage",
  "flash",
  "sessionService",
  "$navigate",
  "$route",

  function vendorsController($scope, Restangular, storage, flash, sessionService, $navigate, $route) {
    $scope.userId = storage.get("user_id");
    $scope.$navigate = $navigate;
    $scope.beerFollowersCount = "";

    currentUser = Restangular.one("users", $scope.userId);

    getRequest = currentUser.get({auth_token: storage.get("auth_token")});
    getRequest.then(function(user) {
      var beerFollowersArr = [];

      $scope.user = user;
      $scope.name = user.name;
      $scope.userName = user.user_name;
      $scope.userEmail = user.email;
      $scope.userDescription = user.description;
      $scope.userEstablished = user.established;
      $scope.userWebsite = user.website;
      $scope.userAddressLineOne = user.address_line_one;
      $scope.userAddressLineTwo = user.address_line_two;
      $scope.beerCount = user.beers.length;
      $scope.followerCount = user.follower_relationships.length;
      
      _.each(user.beers, function(element) {
        beerFollowersArr.push(element.user_beer_relationships);
      });

      $scope.beerFollowersCount = beerFollowersArr.length;
    });

    $scope.saveUserInfo = function() {
      var userInfo = {
        name: $scope.name,
        user_name: $scope.userName,
        email: $scope.userEmail,
        description: $scope.userDescription,
        established: $scope.userEstablished,
        website: $scope.userWebsite,
        address_line_one: $scope.userAddressLineOne,
        address_line_two: $scope.userAddressLineTwo
      };

      putRequest = currentUser.customPUT({user: userInfo, auth_token: storage.get("auth_token")});
      putRequest.then(function(user) {
        flash("Profile updated successfully");
        $scope.hideFlashes();
      });
    };

    $scope.getBeerFollowers = function() {
      var getRequest = currentUser.one("beer_followers").get({auth_token: storage.get("auth_token")});
      getRequest.then(function(users) {
        $scope.beerFollowers = users;
      });
    };

    if($route.current.originalPath.indexOf("beer_followers") > 0) {
      $scope.getBeerFollowers();
    }

    $scope.signOut = function() {
      sessionService.destroySession();
      flash("Signed out successfully");
      $navigate.go("/");
    };
  }
]);