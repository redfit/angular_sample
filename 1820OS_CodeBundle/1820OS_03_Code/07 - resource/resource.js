angular.module('resource', ['ngResource'])
  .factory('Users', function ($resource) {
    var Users = $resource('https://api.mongolab.com/api/1/databases/scrum/collections/users/:id', {
      apiKey:'sn9Qdt80QpQuuoSd0ysicd3dRrfCB-kI',
      id:'@_id.$oid'
    });

    Users.prototype.getFullName = function() {
      return this.firstName + ' ' + this.lastName;
    };

    return Users;
  })
  .controller('ResourceCtrl', function ($scope, Users) {

    $scope.users = Users.query({}, function(users){
      console.log($scope.users.length);
    });

    $scope.remove = function (user) {
      Users['delete']({}, user);
      //user.$delete();
    };

    $scope.add = function () {
      var user = new Users({
        name:'Superhero'
      });
      user.$save();
    };

    $scope.add = function () {
      var user = {
        name:'Superhero'
      };
      Users.save(user);
    };

  });
