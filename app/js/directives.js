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

onTap.directive("CheckUser",[
  "$rootScope",
  "$location",
  "UserService",

  function($root, $location, UserService) {
    return {
      link: function(scope, elem, attrs, ctrl) {
        $root.$on("$routeChangeStart", function(event, currRoute, prevRoute) {
          if(!prevRoute.access.isPublic && !UserService.isLoggedIn) {
            // TODO add logic to redirect to login route.
          }
        });
      }
    };
  }
]);

onTap.directive("basicTabs", function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $(element).basicTabs({
        customActiveClass: 'active',
        tabsParentSelector: '.ui-horizontal-tabs',
        tabSelector: 'li',
        tabsLinkSelector: "a",
        tabsContentSelector: '.ui-tab-pane',
        verticalTabs: false
      });
    }
  };
});