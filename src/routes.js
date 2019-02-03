routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('contas', {
      url: '/',
      title: "Contas", 
      templateUrl: 'views/contas/index.html',
      controller: 'ContasController',
      controllerAs: 'contas'
    })
    .state('contas-add', {
      url: '/adicionar',
      title: "Adicionar Conta", 
      templateUrl: 'views/contas/add.html',
      controller: 'ContasController',
      controllerAs: 'contas'
    });
}
