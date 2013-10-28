var onTapServices = angular.module("onTapServices", ["ngResource"]);

onTapServices.factory("Beer", ["$resource",
  function($resource) {
    return $resource(api + "/beers/:id", {}, {
      query: {method: "GET", params: {id: ""}, isArray: true}
    }); 
  }
]);

onTapServices.factory("SearchBrewery", ["$resource",
  function($resource) {
    return $resource(api + "/breweries/search", {}, {
      search: {method: "GET", params: {brewery_name: "@brewery_name"}, isArray: true}
    }); 
  }
]);

onTapServices.factory("GetBreweryBeers", ["$resource",
  function($resource) {
    return $resource(api + "/breweries/:beerdb_id/beers", {}, {
      getBeers: {method: "GET", params: {beerdb_id: "@beerdb_id"}, isArray: true}
    }); 
  }
]);