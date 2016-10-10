geodash.directives.geodashMain = function(){
  return {
    controller: geodash.controllers.GeoDashControllerMain,
    restrict: 'EA',
    replace: true,
    scope: {},
    templateUrl: 'main.tpl.html', // Can override with geodash.templates.server
    link: function ($scope, element, attrs, controllers)
    {
      setTimeout(function(){ geodash.ui.update(element); }, 0);
    }
  };
};
