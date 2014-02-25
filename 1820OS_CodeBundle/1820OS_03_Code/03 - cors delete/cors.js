angular.module('cors', [])

  .controller('CORSCtrl', function ($scope, $http) {

    $scope.deleteUser = function () {

      var userId = '52d0d8c6e4b06a39eba0018b';

      $http['delete']('https://api.mongolab.com/api/1/databases/scrum/collections/users/' + userId,
        {
          params:{
            apiKey:'sn9Qdt80QpQuuoSd0ysicd3dRrfCB-kI'
          }
        }
      );
    };
  });
