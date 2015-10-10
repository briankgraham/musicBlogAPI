angular.module('kewlBlogs.routey', ['blogsRkewl.auth', 'ngRoute'])
.config(function ($routeProvider) {
  $routeProvider
    .when('/signup', {
      templateUrl: 'app/signup.html',
      controller: 'AuthController'
    })
    .otherwise({
      redirectTo: '/blogs'
    });
});
