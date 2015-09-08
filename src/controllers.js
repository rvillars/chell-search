'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.controller('SearchInputController', function ($scope, $rootScope, SearchService) {
    $scope.search = function() {
        SearchService.search($scope.searchTerm).then(function(results) {
            $scope.model.searchResults = results;
            $scope.model.searchTerm = $scope.searchTerm;
        });
    };
});

chellSearch.controller('SearchResultController', function ($scope, $sce) {
    $scope.highlight = function(text, search) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };
});