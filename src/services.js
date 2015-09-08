'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.service('IndexService', function (SearchAdapter) {

    this.index = function (document, type, group) {
        return SearchAdapter.index(document, type, group);
    };

});

chellSearch.service('SearchService', function (SearchAdapter) {

    this.search = function (searchTerm) {
        return SearchAdapter.search(searchTerm);
    };

    this.query = function () {
        return SearchAdapter.getDocumentList();
    };

});