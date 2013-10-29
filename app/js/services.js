var onTapServices = angular.module("onTapServices", ["ngResource"]);

onTapServices.factory("Beer", ["$resource",
  function($resource) {
    return $resource(api + "/beers/:id", {}, {
      query: {method: "GET", params: {id: ""}, isArray: true}
    }); 
  }
]);

onTapServices.factory("Search", ["$resource",
  function($resource) {
    return {
      All: $resource(api + "/search/all", {}, {getResults: {method: "GET", params: {search_term: "@search_term"}, isArray: true}}),
      Beer: $resource(api + "/search/beer", {}, {getResults: {method: "GET", params: {search_term: "@search_term"}, isArray: true}}),
      Brewery: $resource(api + "/search/breweries", {}, {getResults: {method: "GET", params: {search_term: "@search_term"}, isArray: true}})
    } 
  }
]);

onTapServices.factory("Breweries", ["$resource",
  function($resource) {
    return {
      Beer: $resource(api + "/breweries/:beerdb_id/beers", {}, { getBeers: {method: "GET", params: {beerdb_id: "@beerdb_id"}, isArray: true}})
    }
  }
]);