'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.service('IndexService', function (SearchAdapter) {

    this.index = function (document, user, type) {
        return SearchAdapter.create(document, user, type);
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