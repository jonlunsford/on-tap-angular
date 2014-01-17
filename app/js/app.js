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
  "angularLocalStorage",
  "flash"
]);

onTap.config(["$routeProvider", "RestangularProvider", function($routeProvider, RestangularProvider) {
  RestangularProvider.setBaseUrl("http://192.168.1.4:3000/api/v1");

  $routeProvider
  .when("/", {templateUrl: "../partials/registrationView.html", controller: "registrationController"})
  .when("/vendors/:id", {templateUrl: "../partials/vendorView.html", controller: "vendorsController"})
  .when("/vendors/:id/beers", {templateUrl: "../partials/vendorBeersView.html", controller: "beersController"})
  .when("/vendors/:id/beers/:beer_id", {templateUrl: "../partials/vendorBeerView.html", controller: "beersController"})
  .when("/vendors/:id/edit", {templateUrl: "../partials/vendorEditView.html", controller: "vendorsController"})
  .when("/vendors/:id/settings", {templateUrl: "../partials/vendorSettingsView.html", controller: "vendorsController"})
  .when("/vendors/:id/help", {templateUrl: "../partials/vendorHelpView.html", controller: "vendorsController"})
  .when("/users/:id", {templateUrl: "../partials/userView.html", controller: "usersController"})
  .when("/search", {templateUrl: "../partials/searchView.html", controller: "searchController"})
  .when("/beers", {templateUrl: "../partials/beersListView.html", controller: "beersListController"})
  .when("/breweries/:beerdb_id/beers", {templateUrl: "../partials/beersListView.html", controller: "beersListController"})
  .when("/beers/:id", {templateUrl: "../partials/beersDetailView.html", controller: "beersListController"})
  .otherwise({redirectTo: "/"});
}]);

onTap.run(function($route, $http, $templateCache) {
  angular.forEach($route.routes, function(r) {
    if (r.templateUrl) {
      $http.get(r.templateUrl, {cache: $templateCache});
    }
  });
});