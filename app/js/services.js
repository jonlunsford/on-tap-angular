var onTapServices = angular.module("onTapServices", []);

onTapServices.factory("UserService", ["storage", function(storage) {
  var currentUser = {
    isLoggedIn: false,
    roleId: null,
    userId: null,
    authToken: null
  };

  return currentUser;
}]);

onTapServices.factory("sessionService", [
  "storage",

  function(storage) {

    this.destroySession = function() {
      storage.remove("auth_token");
      storage.remove("user_id");
      storage.set("is_signed_in", false);
    };

    return this;
  }
]);

onTapServices.factory("flashService", [

  function() {

    this.hideFlashes = function() {
      setTimeout(function() {
        $("#flash-messages").fadeOut(200);
      }, 1000);
    };

    return this;
  }
]);