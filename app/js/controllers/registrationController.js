onTapControllers.controller("registrationController", [
  "$scope",
  "Restangular",

  function registrationController($scope, Restangular) {
    var baseRegistration = Restangular.all("users")
    
    $scope.register = function(email, password) {
      var newAccount = user[{email: email, password: password}];
      baseRegistration.post(newAccount);
    }
  }
]);