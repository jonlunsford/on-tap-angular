var onTapControllers = angular.module("onTapControllers", []);

onTapControllers.controller('applicationController', [
  "storage",
  "flash",
  
  function($scope, $navigate, flash, storage) {
    $scope.$navigate = $navigate;
    
    $scope.hideFlashes = function() {
      setTimeout(function() {
        $("#flash-messages").fadeOut(200);
      }, 2000);
    };
  }
]);