onTapControllers.controller("registrationController", [
  "$scope",
  "Restangular",

  function registrationController($scope, Restangular) {
    var baseRegistration = Restangular.all("users")
    
    $scope.register = function(email, password) {
      $scope.emailErrors = false;
      $scope.passwordErrors = false;

      user = {email: email, password: password};
      baseRegistration.post({user: user}).then(function(response) {
        $scope.storeCredentials(response);
      }, function(response) {
        if(response.data.email) {
          $scope.emailErrors = true;
          $scope.emailValidation = "Email address " + response.data.email[0];
        } else if(response.data.password) {
          $scope.passwordErrors = true;
          $scope.passwordValidation = "Password " + response.data.password[0]
        }
      })
    }

    $scope.storeCredentials = function(serverDate) {
      var storage = window.localStorage;
      storage.setItem("auth_token", serverDate.authentication_token);
    }
  }
]);