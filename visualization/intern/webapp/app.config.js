// Configure URL paths and the AngularJS views / components they correspond to.
angular.module('StagHuntApp').config([
  '$routeProvider',
  function config($routeProvider) {
    $routeProvider.when('/simulation', {template: '<simulation-page></simulation-page>'})
        .when('/home-page', {template: '<home-page></home-page>'})
        .otherwise('/home-page');
  }
]);
