'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.factory('SearchContent', function(SearchAdapter) {
    return {
        query: function() {
            return SearchAdapter.getContentList();
        },
        get: function(id) {
            return SearchAdapter.getContent(id);
        },
        create: function(content) {
            return SearchAdapter.create(content);
        },
        update: function(content) {
            return SearchAdapter.update(content);
        },
        remove: function(content) {
            SearchAdapter.remove(content);
        }
    };
});