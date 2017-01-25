geodash.controllers.GeoDashControllerMain = function(
  $interpolate, $scope, $element, $controller,
  $http, $q,
  state, dashboard, stateschema)
{
    $scope.dashboard = dashboard;
    $scope.dashboard_flat = geodash.util.flatten($scope.dashboard);
    $scope.stateschema = stateschema;
    $scope.state = geodash.init.state({
      "state": state,
      "stateschema": stateschema,
      "dashboard": dashboard
    });
    $scope.assets = geodash.util.arrayToObject(extract("assets", $scope.dashboard));

    $scope.refreshMap = function(state){
      // Refresh all child controllers
      $scope.$broadcast("refreshMap", {'state': state});
    };

    $scope.processEvent = function(event, args)
    {
      var c = $.grep(geodash.meta.controllers, function(x, i){
        return x['name'] == 'GeoDashControllerMain';
      })[0];

      for(var i = 0; i < c.handlers.length; i++)
      {
        if(c.handlers[i]['event'] == event.name)
        {
          var handlerName = c.handlers[i]['handler'];
          if(angular.isDefined(handlerName))
          {
            var handlerFn = geodash.handlers[handlerName];
            if(angular.isDefined(handlerFn))
            {
              handlerFn($scope, $interpolate, $http, $q,  event, args);
            }
            else
            {
              geodash.log.error("handlers", "Could not find handler with name "+handlerName+".");
            }
          }
        }
      }
    };

    $.each(geodash.listeners, function(i, x){ $scope.$on(i, x); });

    var c = geodash.api.getController("GeoDashControllerMain");
    for(var i = 0; i < c.handlers.length; i++)
    {
      if(angular.isString(c.handlers[i]['handler']))
      {
        $scope.$on(c.handlers[i]['event'], $scope.processEvent);
      }
      else
      {
        $scope.$on(c.handlers[i]['event'], c.handlers[i]['handler']);
      }
    }
};
