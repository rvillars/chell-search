'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.service('SearchResultModel', function () {
    this.searchTerm = '';
    this.searchResults = [];
    this.searchResultsTerm = null;
    this.searchResultsCount = 0;
});