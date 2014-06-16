'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.controller('SearchBarController', function ($scope) {

    $scope.searchTerm = '';

    $scope.search = function() {
        console.log('I m searching: '+$scope.searchTerm);

    };

});