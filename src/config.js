routing.$inject = ['$locationProvider', '$urlRouterProvider', '$httpProvider'];

export default function routing($locationProvider, $urlRouterProvider, $httpProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $httpProvider.interceptors.push('httpInterceptor');
}