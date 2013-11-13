var api = "http://0.0.0.0:3000\:3000/api/v1";

var onTap = angular.module("onTap", [
  "ngRoute",
  "ngAnimate",
  "ngResource",
  "filters",
  "ajoslin.mobile-navigate",
  "ngMobile",
  "onTapControllers",
  "onTapServices",
  "restangular",
  "angularLocalStorage"
]);

onTap.config(["$routeProvider", "RestangularProvider", function($routeProvider, RestangularProvider) {
  RestangularProvider.setBaseUrl("http://0.0.0.0:3000/api/v1");

  $routeProvider
  .when("/", {templateUrl: "../partials/registrationView.html", controller: "registrationController"})
  .when("/vendors/:id", {templateUrl: "../partials/vendorView.html", controller: "vendorsController"})
  .when("/vendors/:id/edit", {templateUrl: "../partials/vendorEditView.html", controller: "vendorsController"})
  .when("/users/:id", {templateUrl: "../partials/userView.html", controller: "usersController"})
  .when("/search", {templateUrl: "../partials/searchView.html", controller: "searchController"})
  .when("/beers", {templateUrl: "../partials/beersListView.html", controller: "beersListController"})
  .when("/breweries/:beerdb_id/beers", {templateUrl: "../partials/beersListView.html", controller: "beersListController"})
  .when("/beers/:id", {templateUrl: "../partials/beersDetailView.html", controller: "beersListController"})
  .otherwise({redirectTo: "/"})
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