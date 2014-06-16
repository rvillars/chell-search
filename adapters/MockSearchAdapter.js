'use strict';
var chellSearch = angular.module('chell-search');
var host = 'undefined';
var result0 = {
    id: 0,
    title: 'Welcome Page',
    creationDate: new Date(),
    accessRights: 'User',
    status: 'approved',
    body: '<h1>A welcome page</h1>'
  };
var result1 = {
    id: 1,
    title: 'Help Text',
    creationDate: new Date(),
    accessRights: 'User',
    status: 'draft',
    body: '<h1>A help text</h1>'
  };
var mockResult = [
    result0,
    result1
  ];
chellSearch.factory('SearchAdapter', [
  '$http',
  '$q',
  '_',
  function ($http, $q, _) {
    return {
      getContentList: function () {
        var deferred = $q.defer();
        $http.get('http://' + host + '/search/result').success(function (result) {
          deferred.resolve(_.map(result, externalToSearchContent));
        }).error(function () {
          deferred.reject('An error occured while fetching search result list');
        });
        return deferred.promise;
      },
      getContent: function (id) {
        return mockResult[id];
      },
      create: function (result) {
        result.id = mockResult.length;
        result.creationDate = new Date();
        mockResult.push(result);
        return mockResult[result.id];
      },
      update: function (result) {
        mockResult[result.id] = result;
        return mockResult[result.id];
      },
      remove: function (result) {
        mockResult.splice(result.id, 1);
      }
    };
  }
]);
var externalToSearchContent = function (externalContent) {
  var searchContent = externalContent;
  return searchContent;
};
var searchToExternalContent = function (searchContent) {
  var externalContent = searchContent;
  return externalContent;
};
chellSearch.run([
  '$httpBackend',
  '$base64',
  function ($httpBackend, $base64) {
    var authenticated = function (headers) {
      if (headers.Authorization == 'Basic ' + $base64.encode('chellAdmin' + ':' + 'chellAdmin') || headers.Authorization == 'Basic ' + $base64.encode('chellUser' + ':' + 'chellUser')) {
        return true;
      }
      return false;
    };
    $httpBackend.whenGET(/search\/result/).respond(function (method, url, data, headers) {
      return authenticated(headers) ? [
        200,
        mockResult
      ] : [401];
    });
  }
]);