'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.directive('chellSearchInput', function () {
    return {
        restrict: 'E',
        scope: {
            searchButtonHook: '&?'
        },
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
});