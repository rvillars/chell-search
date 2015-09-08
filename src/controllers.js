'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.controller('SearchInputController', function ($scope, $rootScope, SearchService) {
    $scope.search = function() {
        SearchService.search($scope.model.searchTerm).then(function(results) {
            $scope.model.searchResults = results;
        });
    };
});

chellSearch.controller('SearchResultController', function ($scope, $sce) {
    $scope.highlight = function(text, search) {
        if (!text) {
            return '';
        }
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };
});