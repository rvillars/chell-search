'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.factory('IndexService', function (SearchAdapter) {
    return {
        index: function (document, user, type) {
            return SearchAdapter.create(document, user, type);
        }
    };
});

chellSearch.factory('SearchService', function (SearchAdapter, $rootScope) {
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
});