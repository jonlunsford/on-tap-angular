var api = "http://0.0.0.0:3000\:3000";

var onTap = angular.module("onTap", [
  "ngRoute",
  "ngAnimate",
  "ngResource",
  "filters",
  "ajoslin.mobile-navigate",
  "ngMobile",
  "onTapControllers",
  "onTapServices"
]);

onTap.config(["$routeProvider", function($routeProvider) {
  $routeProvider
  .when("/search", {templateUrl: "../partials/searchView.html", controller: "searchController"})
  .when("/beers", {templateUrl: "../partials/beersListView.html", controller: "beersListController"})
  .when("/beers/:id", {templateUrl: "../partials/beersDetailView.html", controller: "beersListController"})
  .otherwise({redirectTo: "/beers"})
}]);

onTap.run(function($route, $http, $templateCache) {
  angular.forEach($route.routes, function(r) {
    if (r.templateUrl) { 
      $http.get(r.templateUrl, {cache: $templateCache});
    }
  });
});

onTap.directive('ngTap', function() {
  var isTouchDevice = !!("ontouchstart" in window);
  return function(scope, elm, attrs) {
    if (isTouchDevice) {
      var tapping = false;
      elm.bind('touchstart', function() { tapping = true; });
      elm.bind('touchmove', function() { tapping = false; });
      elm.bind('touchend', function() { 
        tapping && scope.$apply(attrs.ngTap);
      });
    } else {
      elm.bind('click', function() {
        scope.$apply(attrs.ngTap);
      });
    }
  };
});