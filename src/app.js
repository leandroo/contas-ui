import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import config from './config';
import routes from './routes';
import {MDCRipple} from '@material/ripple';
import {MDCTextField} from '@material/textfield';
import {MDCTopAppBar} from '@material/top-app-bar';
import {MDCMenu} from '@material/menu';
import {MDCTabBar} from '@material/tab-bar';
import {MDCSnackbar} from '@material/snackbar';

import {
  ContasController,
  TopBarController,
} from './controllers';

angular.module('app', [uiRouter, ngAnimate])
  .run(['$rootScope', '$state', '$stateParams', ($rootScope, $state,   $stateParams) => {
    console.log('App is running!');
    if ('serviceWorker' in navigator) {
      console.log('ServiceWorker é suportado, vamos usar!');
    } else {
      console.log('ServiceWorker não é suportado.');
    }
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$viewContentLoaded', () => {
      console.log('viewContentLoaded');
    });
    $rootScope.$on('$includeContentLoaded', () => {
      console.log('includeContentLoaded');
    });
  }])
  .config(config)
  .config(routes)
  .controller('ContasController', ContasController)
  .controller('TopBarController', TopBarController)
  .service('httpInterceptor', ['$q', 'progressIndicator', ($q, progressIndicator) => {
    return {
      request: (req) => {
        progressIndicator.show();
        return req || $q.when(req);
      },
      response: (res) => {
        progressIndicator.hide();
        return res || $q.when(res);
      },
      responseError: (res) => {
        progressIndicator.hide();
        console.log(res);
        return res || $q.when(res);
      }
    }
  }])
  .directive('mdcRipple',[() => {
    return {
      link: (scope, element) => {
        MDCRipple.attachTo(element[0]);
      }
    };
  }])
  .directive('mdcRippleSurface',[() => {
    return {
      link: (scope, element) => {
        element.addClass('mdc-ripple-surface');
        MDCRipple.attachTo(element[0]);
      }
    };
  }])
  .directive('mdcTextField',[() => {
    return {
      link: (scope, element) => {
        MDCTextField.attachTo(element[0]);
      }
    };
  }])
  .directive('mdcTopAppBar',[() => {
    return {
      link: (scope, element) => {
        MDCTopAppBar.attachTo(element[0]);
      }
    };
  }])
  .directive('mdcMenu',[() => {
    return {
      link: (scope, element) => {
        MDCMenu.attachTo(element[0]);
      }
    };
  }])
  .directive('mdcTabBar',[() => {
    return {
      link: (scope, element) => {
        MDCTabBar.attachTo(element[0]);
      }
    };
  }])
  .service('progressIndicator', ['$rootScope', ($rootScope) => {
    if (!$rootScope.loadingCount) {
      $rootScope.loadingCount = 0;
    }
    var element = angular.element(document.querySelector('.app-linear-progress'));
    return {
      show: function () {
        if (!$rootScope.loadingCount) {
          element.removeClass('ng-hide');
        }
        $rootScope.loadingCount++;
      },
      hide: function () {
        $rootScope.loadingCount--;
        if (!$rootScope.loadingCount) {
          element.addClass('ng-hide');
        }
      }
    }
  }])
  .service('snackbar', [() => {
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    return {
      show: (message) => {
        const dataObj = {
          message: message,
          actionText: 'OK',
          actionHandler: () => {
            console.log('actionHandler');
          }
        };
        snackbar.show(dataObj);
      }
    }
  }]);
  