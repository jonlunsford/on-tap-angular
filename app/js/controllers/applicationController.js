var onTapControllers = angular.module("onTapControllers", []);

onTapControllers.controller('applicationController', function($scope, $navigate) {
  $scope.$navigate = $navigate;
  $scope.hideFlashes = function() {
    setTimeout(function() {
      $("#flash-messages").fadeOut(200);
    }, 2000);
  };
});