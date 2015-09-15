'use strict';
var chellSearch = angular.module('chell-search');
var host = 'localhost:19200';
var index = 'chell';
chellSearch.factory('SearchAdapter', [
  '$http',
  '$q',
  '_',
  function ($http, $q, _) {
    return {
      getDocumentList: function () {
        var deferred = $q.defer();
        $http.get('http://' + host + '/' + index + '/_search?pretty=true&q=*:*').success(function (result) {
          deferred.resolve(_.map(result.hits.hits, externalToSearchDocument));
        }).error(function () {
          deferred.reject('An error occured while fetching search result list');
        });
        return deferred.promise;
      },
      getDocument: function (id, type) {
        var deferred = $q.defer();
        $http.get('http://' + host + '/' + index + '/' + type + '/' + id).success(function (result) {
          deferred.resolve(_.map(result, externalToSearchDocument));
        }).error(function () {
          deferred.reject('An error occured while fetching search result list');
        });
        return deferred.promise;
      },
      index: function (document, type, group) {
        var deferred = $q.defer();
        $http.post('http://' + host + '/' + index + '/' + type, searchToExternalDocument(document, type, group)).success(function (result) {
          deferred.resolve(externalToSearchDocument(result));
        }).error(function () {
          deferred.reject('An error occured while updating result');
        });
        return deferred.promise;
      },
      update: function (document, type, group) {
        var deferred = $q.defer();
        $http.put('http://' + host + '/' + index + '/' + type + '/' + document.id, searchToExternalDocument(document)).success(function (result) {
          deferred.resolve(externalToSearchDocument(result));
        }).error(function () {
          deferred.reject('An error occured while updating result');
        });
        return deferred.promise;
      },
      remove: function (document, type, group) {
        var deferred = $q.defer();
        $http({
          method: 'DELETE',
          url: 'http://' + host + '/' + index + '/' + type + '/' + document.id
        }).success(function () {
          deferred.resolve();
        }).error(function () {
          deferred.reject('An error occured while deleting result');
        });
        return deferred.promise;
      },
      search: function (searchTerm) {
        var deferred = $q.defer();
        $http.get('http://' + host + '/' + index + '/_search?q=' + searchTerm).success(function (result) {
          deferred.resolve(_.map(result.hits.hits, externalToSearchDocument));
        }).error(function () {
          deferred.reject('An error occured while fetching search result list');
        });
        return deferred.promise;
      }
    };
  }
]);
var externalToSearchDocument = function (externalDocument) {
  var searchDocument = {};
  searchDocument.id = externalDocument._id;
  searchDocument.type = externalDocument._type;
  searchDocument.version = externalDocument._version;
  searchDocument.creationDate = externalDocument._timestamp;
  searchDocument.document = externalDocument._source;
  return searchDocument;
};
var searchToExternalDocument = function (searchDocument, type, group) {
  var externalDocument = searchDocument;
  return externalDocument;
};