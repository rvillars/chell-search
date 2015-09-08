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
]);;// Source: build/directives.js
var chellSearch = angular.module('chell-search');
chellSearch.directive('chellSearchInput', function () {
  return {
    restrict: 'E',
    scope: {},
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
chellSearch.factory('IndexService', [
  'SearchAdapter',
  function (SearchAdapter) {
    return {
      index: function (document, user, type) {
        return SearchAdapter.create(document, user, type);
      }
    };
  }
]);
chellSearch.factory('SearchService', [
  'SearchAdapter',
  '$rootScope',
  function (SearchAdapter, $rootScope) {
    var searchResults;
    return {
      search: function (searchTerm) {
        SearchAdapter.search(searchTerm).then(function (results) {
          searchResults = results;
          $rootScope.$broadcast('chellSearch:resultsFound', searchTerm);
        });
      },
      getResults: function () {
        return searchResults;
      },
      query: function () {
        return SearchAdapter.getDocumentList();
      }
    };
  }
]);;// Source: build/controllers.js
var chellSearch = angular.module('chell-search');
chellSearch.controller('SearchInputController', [
  '$scope',
  '$rootScope',
  'SearchService',
  function ($scope, $rootScope, SearchService) {
    $scope.searchTerm = '';
    $scope.search = function () {
      SearchService.search($scope.searchTerm);
    };
  }
]);
chellSearch.controller('SearchResultController', [
  '$scope',
  'SearchService',
  '$sce',
  function ($scope, SearchService, $sce) {
    $scope.$on('chellSearch:resultsFound', function (event, searchTerm) {
      $scope.searchResults = SearchService.getResults();
      $scope.searchTerm = searchTerm;
    });
    $scope.highlight = function (text, search) {
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
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Search\" name=\"q\" ng-model=\"searchTerm\">\n" +
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
    "<div ng-repeat=\"result in searchResults\">\n" +
    "    <article class=\"search-result row\">\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-10 excerpet\">\n" +
    "            <h4><a href=\"#\" title=\"\"><div ng-bind-html=\"highlight(result.document.title, searchTerm)\"></div></a></h4>\n" +
    "            <p ng-bind-html=\"highlight(result.document.body, searchTerm)\"></p>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-2\">\n" +
    "            <ul class=\"meta-search\">\n" +
    "                <li><i class=\"glyphicon glyphicon-calendar\"></i> <span>{{result.creationDate | date:'dd.MM.yyyy'}}</span></li>\n" +
    "                <li><i class=\"glyphicon glyphicon-user\"></i> <span ng-bind-html=\"highlight(result.accessRights, searchTerm)\"></span></li>\n" +
    "                <li><i class=\"glyphicon glyphicon-file\"></i> <span ng-bind-html=\"highlight(result.type, searchTerm)\"></span></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <span class=\"clearfix borda\"></span>\n" +
    "    </article>\n" +
    "</div>");
}]);
