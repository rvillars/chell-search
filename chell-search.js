'use strict';
// Source: build/locale-en.js
try {
  angular.module('translations');
} catch (e) {
  angular.module('translations', ['pascalprecht.translate']);
}

angular.module('translations').config(['$translateProvider',
  function ($translateProvider) {
    $translateProvider.translations('en', {});
    $translateProvider.preferredLanguage('en');
  }
]);
;// Source: build/module.js
var chellSearch = angular.module('chell-search', [
    'templates-chell-search',
    'underscore',
    'angular-underscore',
    'ui.bootstrap',
    'base64',
    'ngCkeditor',
    'ngSanitize',
    'translations',
    'ngMockE2E'
  ]);;// Source: build/models.js
var chellSearch = angular.module('chell-search');
chellSearch.service('SearchResultModel', function () {
  this.searchTerm = '';
  this.searchResults = [];
  this.searchResultsTerm = null;
  this.searchResultsCount = 0;
});;// Source: build/directives.js
var chellSearch = angular.module('chell-search');
chellSearch.directive('chellSearchInput', function () {
  return {
    restrict: 'E',
    scope: { searchButtonHook: '&?' },
    controller: 'SearchInputController',
    templateUrl: 'templates/search-input.tpl.html'
  };
});
chellSearch.directive('chellSearchResults', function () {
  return {
    restrict: 'E',
    scope: {},
    controller: 'SearchResultController',
    templateUrl: 'templates/search-results.tpl.html'
  };
});;// Source: build/services.js
var chellSearch = angular.module('chell-search');
chellSearch.service('IndexService', [
  'SearchAdapter',
  function (SearchAdapter) {
    this.index = function (document, type, group) {
      return SearchAdapter.index(document, type, group);
    };
  }
]);
chellSearch.service('SearchService', [
  'SearchAdapter',
  function (SearchAdapter) {
    this.search = function (searchTerm) {
      return SearchAdapter.search(searchTerm);
    };
    this.query = function () {
      return SearchAdapter.getDocumentList();
    };
  }
]);;// Source: build/controllers.js
var chellSearch = angular.module('chell-search');
chellSearch.controller('SearchInputController', [
  '$scope',
  '$rootScope',
  'SearchService',
  'SearchResultModel',
  function ($scope, $rootScope, SearchService, SearchResultModel) {
    $scope.model = SearchResultModel;
    $scope.search = function () {
      SearchService.search($scope.model.searchTerm).then(function (results) {
        $scope.model.searchResults = results;
        $scope.model.searchResultsCount = results.length;
      });
      $scope.model.searchResultsTerm = $scope.model.searchTerm;
      $scope.searchButtonHook();
    };
  }
]);
chellSearch.controller('SearchResultController', [
  '$scope',
  '$sce',
  'SearchResultModel',
  function ($scope, $sce, SearchResultModel) {
    $scope.model = SearchResultModel;
    $scope.highlight = function (text, search) {
      if (!text) {
        return '';
      }
      if (!search) {
        return $sce.trustAsHtml(text);
      }
      return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };
  }
]);;// Source: build/templates.js
angular.module('templates-chell-search', ['templates/search-input.tpl.html', 'templates/search-results.tpl.html']);

angular.module("templates/search-input.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/search-input.tpl.html",
    "<div>\n" +
    "    <form id=\"searchForm\" name=\"searchForm\" ng-submit=\"search()\">\n" +
    "        <fieldset>\n" +
    "            <div class=\"input-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Search\" name=\"q\" ng-model=\"model.searchTerm\">\n" +
    "\n" +
    "                <div class=\"input-group-btn\">\n" +
    "                    <a class=\"btn btn-default\" ng-click=\"search()\"><i class=\"glyphicon glyphicon-search\"></i></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </fieldset>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("templates/search-results.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/search-results.tpl.html",
    "<hgroup class=\"mb20\">\n" +
    "    <h1>Search Results</h1>\n" +
    "    <h2 ng-show=\"model.searchResultsTerm\" class=\"lead\"><strong style=\"color: #428bca\">{{model.searchResultsCount}}</strong> results were found for the search for <strong style=\"color: #428bca\">{{model.searchResultsTerm}}</strong></h2>\n" +
    "</hgroup>\n" +
    "<div ng-repeat=\"result in model.searchResults\">\n" +
    "    <article class=\"search-result row\">\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-10 excerpet\">\n" +
    "            <h4><a href=\"#\" title=\"\"><div ng-bind-html=\"highlight(result.document.title, model.searchTerm)\"></div></a></h4>\n" +
    "            <p ng-bind-html=\"highlight(result.document.body, model.searchTerm)\"></p>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-2\">\n" +
    "            <ul class=\"meta-search\">\n" +
    "                <li><i class=\"glyphicon glyphicon-calendar\"></i> <span>{{result.creationDate | date:'dd.MM.yyyy'}}</span></li>\n" +
    "                <li><i class=\"glyphicon glyphicon-file\"></i> <span ng-bind-html=\"result.version\"></span></li>\n" +
    "                <li><i class=\"glyphicon glyphicon-tag\"></i> <span ng-bind-html=\"highlight(result.type, model.searchTerm)\"></span></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <span class=\"clearfix borda\"></span>\n" +
    "    </article>\n" +
    "</div>");
}]);
