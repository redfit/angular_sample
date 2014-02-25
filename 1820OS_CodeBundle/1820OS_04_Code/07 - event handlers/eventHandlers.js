angular.module('eventHandlers', [])

  .controller('EventhandlersCtrl', function ($scope) {

    $scope.items = ['foo', 'bar', 'baz'];

    $scope.logPosition = function (item, $event) {
      console.log(item + ' was clicked at: ' + $event.clientX + ',' + $event.clientY);
    };
  });
