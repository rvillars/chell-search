'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.directive('chellSearchInput', function (SearchResultModel) {
    return {
        restrict: 'E',
        scope: {},
        controller: 'SearchInputController',
        templateUrl: 'templates/search-input.tpl.html',
        link: function(scope, elem, attr) {
            scope.model = SearchResultModel;
        }
    };
});

chellSearch.directive('chellSearchResults', function (SearchResultModel) {
    return {
        restrict: 'E',
        scope: {},
        controller: 'SearchResultController',
        templateUrl: 'templates/search-results.tpl.html',
        link: function(scope, elem, attr) {
            scope.model = SearchResultModel;
        }
    };
});