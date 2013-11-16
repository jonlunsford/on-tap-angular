onTapControllers.controller("registrationController", [
  "$scope",
  "Restangular",
  "$navigate",
  "storage",

  function registrationController($scope, Restangular, $navigate, storage) {
    var baseRegistration = Restangular.all("users");
    
    $scope.register = function(email, password) {
      $scope.emailErrors = false;
      $scope.passwordErrors = false;

      user = {email: email, password: password};

      baseRegistration.post({user: user}).then(function() {
        $scope.signIn(user);
      }, function(response) {
        handleLoginErrors(response)
      });
    };

    handleLoginErrors = function(serverResponse) {
      if(serverResponse.data.email) {
        $scope.emailErrors = true;
        $scope.emailValidation = "Email address " + serverResponse.data.email[0];
      } else if(serverResponse.data.password) {
        $scope.passwordErrors = true;
        $scope.passwordValidation = "Password " + serverResponse.data.password[0]
      } else if(serverResponse.data.errors) {
        $scope.passwordErrors = true;
        $scope.passwordValidation = serverResponse.data.errors[0]
      }
    };

    $scope.signIn = function(credentials) {
      $scope.emailErrors = false;
      $scope.passwordErrors = false;

      baseRegistration.one("sign_in").customPOST({email: credentials.email, password: credentials.password}).then(function(response) {
        storeCredentials(response);
      }, function(response) {
         handleLoginErrors(response);
      });
    };

    storeCredentials = function(serverData) {
      storage.set("auth_token", serverData.authentication_token);
      storage.set("user_id", serverData.user);
      storage.set("is_signed_in", true);
      var existingRoleId = parseInt(storage.get("role_id"), 10)

      if(!storage.get("role_id")) {
        $scope.shouldAskUser = true; 
      } else {
        navigateToUserAccount(existingRoleId, storage.get("user_id"));
      }
    };

    $scope.setUserType = function(typeId) {
      var user = {role_id: typeId};

      if($scope.shouldAskUser) {
        baseRegistration.customPUT({user: user}, storage.get("user_id"), {auth_token: storage.get("auth_token")}).then(function(response){
          storage.set("role_id", typeId);
          $scope.shouldAskUser = false;
          navigateToUserAccount(storage.get("role_id"), storage.get("user_id"));
        });
      }
    };

    navigateToUserAccount = function(userTypeId, userId) {
      var userPath = (userTypeId === 1 ? "vendors" : "users");
      $navigate.go(userPath + "/" + userId); 
    }
  }
]);