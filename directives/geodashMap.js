geodash.directives.geodashMap = function(){
  return {
    controller: geodash.controllers.GeoDashControllerBase,
    restrict: 'EA',
    replace: false,
    transclude: false,
    scope: true,
    template: undefined,
    link: function ($scope, element, attrs, controllers){}
  };
};
