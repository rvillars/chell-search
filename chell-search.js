'use strict';
// Source: build/module.js
var chellSearch = angular.module('chell-search', [
    'templates-chell-search',
    'ngTable',
    'underscore',
    'angular-underscore',
    'ui.bootstrap',
    'base64',
    'ngMockE2E'
  ]);;// Source: build/models.js
var chellSearch = angular.module('chell-search');
chellSearch.factory('SearchContent', [
  'SearchAdapter',
  function (SearchAdapter) {
    return {
      query: function () {
        return SearchAdapter.getContentList();
      },
      get: function (id) {
        return SearchAdapter.getContent(id);
      },
      create: function (content) {
        return SearchAdapter.create(content);
      },
      update: function (content) {
        return SearchAdapter.update(content);
      },
      remove: function (content) {
        SearchAdapter.remove(content);
      }
    };
  }
]);;// Source: build/controllers.js
var chellSearch = angular.module('chell-search');
chellSearch.controller('SearchBarController', [
  '$scope',
  function ($scope) {
    $scope.searchTerm = '';
    $scope.search = function () {
      console.log('I m searching: ' + $scope.searchTerm);
    };
  }
]);;// Source: build/templates.js
angular.module('templates-chell-search', []);

