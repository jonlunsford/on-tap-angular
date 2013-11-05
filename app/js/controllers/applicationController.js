var onTapControllers = angular.module("onTapControllers", []);

onTapControllers.controller('applicationController', function($scope, $navigate) {
  $scope.$navigate = $navigate;
});