import {MDCTemporaryDrawer} from '@material/drawer';
import {MDCMenu} from '@material/menu';

export class ContasController {
  constructor($scope, $http, $state, snackbar) {
    this.$scope = $scope
    this.$http = $http;
    this.$state = $state;
    this.snackbar = snackbar;
    this.form = {};
    this.path = '/api/contas';

    this.getList();
    this.$scope.$on('TopBarController.search', (event, args) => {
      this.search = args;
    });
  
  }

  getList() {
    this.$http.get(this.path).then(
      (res) => { 
        this.lista = res.data;
      },
      (err) => { 
        this.lista = [];
        console.log(err);
      }
    );
  }

  add() {
    this.$http.post(this.path, this.form).then(
      (res) => {
        if(res.status == 201) {
          this.$state.go('contas');
          this.snackbar.show("Conta adicionada!");
        } else {
          this.snackbar.show("Conta não foi adicionada!");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

export class TopBarController {
  constructor($scope) {
    this.$scope = $scope;
  }

  onSearchChange() {
    this.$scope.$emit('TopBarController.search', this.search);
  }

  openDrawer() {
    let el = document.querySelector('.app-drawer');
    let drawer = new MDCTemporaryDrawer(el);
    drawer.open = true;
  }

  openMenu() {
    let el = document.querySelector('.mdc-menu');
    let menu = new MDCMenu(el);
    console.dir(menu)
    menu.show();
  }

  openSearch() {
    let el = document.querySelector('.mdc-top-app-bar__default');
    let classList = el.classList;
    classList.toggle('ng-hide');

    el = document.querySelector('.mdc-top-app-bar__search');
    classList = el.classList;
    classList.toggle('ng-hide')
  }

}
