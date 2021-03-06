'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.controller('SearchInputController', function ($scope, $rootScope, SearchService, SearchResultModel) {
    $scope.model = SearchResultModel;
    $scope.search = function() {
        SearchService.search($scope.model.searchTerm).then(function(results) {
            $scope.model.searchResults = results;
            $scope.model.searchResultsCount = results.length;
        });
        $scope.model.searchResultsTerm = $scope.model.searchTerm;
        $scope.searchButtonHook();
    };
});

chellSearch.controller('SearchResultController', function ($scope, $sce, SearchResultModel) {
    $scope.model = SearchResultModel;
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