angular.module('kewlBlogs', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
    .when('/signup', {
      templateUrl: 'app/signup.html',
      controller: 'AuthController'
    })
    .when('/blogs', {
      templateUrl:'app/blogs.html',
      controller: 'grabData'
    })
    .when('/login', {
      templateUrl: 'app/login.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/signup'
    });
})
.factory('Links', function ($http) {
  var getLinks = function () {
    return $http({
      method: 'GET',
      url: 'http://hypem.com/playlist/popular/3day/json/1/data.js'
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  var addUser = function (user) {
    //console.log(user);
    return $http({
      method: 'POST',
      url: '/api/users',
      data: user
    });
  };
  var checkUser = function (user) {
    //console.log(user);
    return $http({
      method: 'POST',
      url: '/api/usersDB',
      data: user
    });
  };

  return {
    getLinks: getLinks,
    addUser: addUser,
    checkUser: checkUser
  };
})
.controller('grabData', function ($scope, Links) {
  $scope.links = {};
  Links.getLinks()
  .then(function (resp) {
    var newArr = [];
    for (var x in resp) {
      newArr.push(resp[x]);
    }
    newArr.pop();
    $scope.links.data = newArr;
  });
})
.controller('AuthController', function ($scope, $location, Links) {
  $scope.addUser = function () {
    Links.addUser($scope.user)
    .then(function (data) {
      $location.path('/blogs');
    });
  };
  $scope.checkUser = function () {
    Links.checkUser($scope.user)
    .then(function (data) {
      $location.path('/blogs');
    });
  };
});


