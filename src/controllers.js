'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.controller('SearchInputController', function ($scope, $rootScope, SearchService) {

    $scope.searchTerm = '';

    $scope.search = function() {
        SearchService.search($scope.searchTerm);
    };

});

chellSearch.controller('SearchResultController', function ($scope, SearchService, $sce) {
    $scope.$on('chellSearch:resultsFound', function(event, searchTerm) {
        $scope.searchResults = SearchService.getResults();
        $scope.searchTerm = searchTerm;
    });

    $scope.highlight = function(text, search) {
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };
});