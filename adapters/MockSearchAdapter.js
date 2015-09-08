'use strict';
var chellSearch = angular.module('chell-search');
var host = 'undefined';
chellSearch.factory('SearchAdapter', [
  '$http',
  '$q',
  '_',
  function ($http, $q, _) {
    return {
      getDocumentList: function () {
        var deferred = $q.defer();
        $http.get('http://' + host + '/search/').success(function (result) {
          deferred.resolve(_.map(result, externalToSearchDocument));
        }).error(function () {
          deferred.reject('An error occured while fetching search result list');
        });
        return deferred.promise;
      },
      getContent: function (id) {
        var deferred = $q.defer();
        $http.get('http://' + host + '/search/result' + id).success(function (result) {
          deferred.resolve(_.map(result, externalToSearchDocument));
        }).error(function () {
          deferred.reject('An error occured while fetching search result list');
        });
        return deferred.promise;
      },
      create: function (document, user, type) {
        var deferred = $q.defer();
        $http.post('http://' + host + '/search/' + type, searchToExternalDocument(document, user, type)).success(function (result) {
          deferred.resolve(externalToSearchDocument(result));
        }).error(function () {
          deferred.reject('An error occured while updating result');
        });
        return deferred.promise;
      },
      update: function (result) {
        var deferred = $q.defer();
        $http.put('http://' + host + '/search/result/' + result.id, searchToExternalDocument(result)).success(function (result) {
          deferred.resolve(externalToSearchDocument(result));
        }).error(function () {
          deferred.reject('An error occured while updating result');
        });
        return deferred.promise;
      },
      remove: function (result) {
        var deferred = $q.defer();
        $http({
          method: 'DELETE',
          url: 'http://' + host + '/search/result/' + result.id
        }).success(function () {
          deferred.resolve();
        }).error(function () {
          deferred.reject('An error occured while deleting result');
        });
        return deferred.promise;
      },
      search: function (searchTerm) {
        var deferred = $q.defer();
        $http.get('http://' + host + '/search?q=' + searchTerm).success(function (result) {
          deferred.resolve(_.map(result, externalToSearchDocument));
        }).error(function () {
          deferred.reject('An error occured while fetching search result list');
        });
        return deferred.promise;
      }
    };
  }
]);
var externalToSearchDocument = function (externalDocument) {
  var searchDocument = externalDocument;
  return searchDocument;
};
var searchToExternalDocument = function (searchDocument, user, type) {
  var externalDocument = {};
  externalDocument.accessRights = user;
  externalDocument.type = type;
  externalDocument.document = searchDocument;
  return externalDocument;
};