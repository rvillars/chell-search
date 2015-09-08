'use strict';
var chellSearch = angular.module('chell-search');
chellSearch.factory('IndexCmsContentInterceptor', [
  '$rootScope',
  '$q',
  'httpBuffer',
  '$window',
  function ($rootScope, $q, httpBuffer, $window) {
    return {
      request: function (config) {
        if (config.url.indexOf('cms/content') > -1 && (config.method == 'POST' || config.method == 'PUT')) {
          var content = config.data;
          if (content) {
            console.log('Content indexed: ' + content.body);
          }
        }
        return config;
      }
    };
  }
]);
chellSearch.config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('IndexCmsContentInterceptor');
  }
]);