angular.module('customResourceDemo', ['mongolabResource'])
  .constant('MONGOLAB_CONFIG', {
    DB_NAME: 'scrum',
    API_KEY: 'sn9Qdt80QpQuuoSd0ysicd3dRrfCB-kI'
  })

  .factory('Users', function (mongolabResource) {
    return mongolabResource('users');
  })

  .factory('Projects', function (mongolabResource) {
    return mongolabResource('projects');
  })

  .controller('CustomResourceCtrl', function ($scope, Users, Projects) {

    Users.query().then(function(users){
      $scope.users = users;
    });

    Projects.query().then(function(projects){
      $scope.projects = projects;
    });

    $scope.addSuperhero = function () {
      new Users({name: 'Superhero'}).$save();
    };
  });

