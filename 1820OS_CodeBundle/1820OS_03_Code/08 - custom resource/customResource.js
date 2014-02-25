angular.module('mongolabResource', [])

  .factory('mongolabResource', function ($http, MONGOLAB_CONFIG) {

    return function (collectionName) {

      //basic configuration
      var collectionUrl =
        'https://api.mongolab.com/api/1/databases/' +
          MONGOLAB_CONFIG.DB_NAME +
          '/collections/' + collectionName;

      var defaultParams = {apiKey:MONGOLAB_CONFIG.API_KEY};

      //utility methods
      var getId = function (data) {
        return data._id.$oid;
      };

      //a constructor for new resources
      var Resource = function (data) {
        angular.extend(this, data);
      };

      Resource.query = function (params) {
        return $http.get(collectionUrl, {
          params:angular.extend({q:JSON.stringify({} || params)}, defaultParams)
        }).then(function (response) {
            var result = [];
            angular.forEach(response.data, function (value, key) {
              result[key] = new Resource(value);
            });
            return result;
          });
      };

      Resource.save = function (data) {
        return $http.post(collectionUrl, data, {params:defaultParams})
          .then(function (response) {
            return new Resource(data);
          });
      };

      Resource.prototype.$save = function (data) {
        return Resource.save(this);
      };

      Resource.remove = function (data) {
        return $http['delete'](collectionUrl + '', defaultParams)
          .then(function (response) {
            return new Resource(data);
          });
      };

      Resource.prototype.$remove = function (data) {
        return Resource.remove(this);
      };

      //other CRUD methods go here

      //convenience methods
      Resource.prototype.$id = function () {
        return getId(this);
      };

      return Resource;
    };
  });

  angular.module('httpInterceptors', [])

  .config(function($httpProvider){
    $httpProvider.responseInterceptors.push('retryInterceptor');
  })

  .factory('retryInterceptor', function ($injector, $q) {

    return function(responsePromise) {
      return responsePromise.then(null, function(errResponse) {
        if (errResponse.status === 503) {
          return $injector.get('$http')(errResponse.config);
        } else {
          return $q.reject(errResponse);
        }
      });
    };
  });

  .controller('UsersCtrl', function ($scope, $http) {

    $scope.queryUsers = function () {
      $http.get('http://localhost:3000/databases/ascrum/collections/
                users')
                .success(function (data, status, headers, config) {
                  $scope.users = data;
                }).error(function (data, status, headers, config) {
                  throw new Error('Something went wrong...');
                });
    };
  });

  describe('$http basic', function () {

    var $http, $httpBackend, $scope, ctrl;
    beforeEach(module('test-with-http-backend'));
    beforeEach(inject(function (_$http_, _$httpBackend_) {
      $http = _$http_;
      $httpBackend = _$httpBackend_;
    }));
    beforeEach(inject(function (_$rootScope_, _$controller_) {
      $scope = _$rootScope_.$new();
      ctrl = _$controller_('UsersCtrl', {
        $scope : $scope
      });
    }));

    it('should return all users', function () {

      //setup expected requests and responses
      $httpBackend
      .whenGET('http://localhost:3000/databases/ascrum/collections/users').respond([{name: 'Pawel'}, {name: 'Peter'}]);

      //invoke code under test
      $scope.queryUsers();

      //simulate response
      $httpBackend.flush();

      //verify results
      expect($scope.users.length).toEqual(2);
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

