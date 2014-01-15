var onTapServices = angular.module("onTapServices", ["ngResource"]);

onTapServices.factory("UserService", ["storage", function(storage) {
  var currentUser = {
    isLoggedIn: false,
    roleId: null,
    userId: null,
    authToken: null
  };

  return currentUser;
}]);

onTapServices.service("SessionService", function() {
  var userIsAuthenticated = false;
  
  this.setUserAuthenticated = function(value) {
    userIsAuthenticated = value;
  };

  this.getUserAuthenticated = function() {
    return userIsAuthenticated;
  };
});