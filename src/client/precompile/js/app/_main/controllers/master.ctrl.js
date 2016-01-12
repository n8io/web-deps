(function() {
  'use strict';

  angular
    .module('app.controllers')
    .controller('MasterController', masterController)
    ;

  /* @ngInject */
  function masterController() {
    const vm = this; // eslint-disable-line

    vm.email = 'bill.landers@ignitionone.com';
  }
})();
