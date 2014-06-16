'use strict';
var chellSearch = angular.module('chell-search');
var host = 'localhost';
chellSearch.service('es', [
  'esFactory',
  function (esFactory) {
    return esFactory({ host: 'localhost:9200' });
  }
]);