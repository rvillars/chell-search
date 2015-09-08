'use strict';

var chellSearchExample1 = angular.module('chell-search-example1', [
    'chell-search',
    'ngMockE2E'
]);

chellSearchExample1.controller('ExampleContentController', function ($scope, IndexService, SearchService) {

    $scope.editorConfig = {
        extraPlugins: 'divarea',
        height: '100px'
    };

    $scope.editDocument = {};
    $scope.results = [];

    $scope.save = function () {
        IndexService.index($scope.editDocument, 'ExampleUser', 'Content').then(function(result) {
            $scope.cancel();
            $scope.results.push(result);
        });
    };

    $scope.cancel = function () {
        $scope.editDocument = {};
        if ($scope.contentForm) {
            $scope.contentForm.$setPristine();
        }
    };

    SearchService.query().then(function (results) {
        $scope.results = results;
    });

});

chellSearchExample1.run(function run($httpBackend) {
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
});