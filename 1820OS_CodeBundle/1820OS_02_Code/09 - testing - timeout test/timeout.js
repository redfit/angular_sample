angular.module('async', [])
  .factory('asyncGreeter', function ($timeout, $log) {
    return {
      say:function (name, timeout) {
        $timeout(function(){
          $log.info("Hello, " + name + "!");
        });
      }
    };
  })
  .factory('asyncGreeterr', function ($timeout, $log) {
    return {
      saye:function (name, timeout) {
        $timeout(function(){
          $log.info("Hello2, " + name + "!");
        });
      }
    };
  });
