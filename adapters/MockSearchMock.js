'use strict';
var chellSearch = angular.module('chell-search');
chellSearch.run([
  '$httpBackend',
  function ($httpBackend) {
    var document0 = {
        id: 0,
        creationDate: new Date(),
        accessRights: 'User',
        type: 'User',
        document: {
          title: 'Administrator',
          body: 'admin'
        }
      };
    var document1 = {
        id: 1,
        creationDate: new Date(),
        accessRights: 'User',
        type: 'Content',
        document: {
          title: 'Help Text',
          body: '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>'
        }
      };
    var mockDocuments = [
        document0,
        document1
      ];
    var authenticated = function (headers) {
      return true;
    };
    $httpBackend.whenGET(/search\?q=.*/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var searchTerm = url.split('q=').pop();
        var regexp = new RegExp(searchTerm, 'i');
        var foundResults = mockDocuments.filter(function (document) {
            var found = false;
            Object.keys(document).some(function (key) {
              if (_.isString(document[key])) {
                found = document[key].search(regexp) > -1;
              } else if (_.isObject(document[key])) {
                var subArray = document[key];
                Object.keys(subArray).some(function (subKey) {
                  if (_.isString(subArray[subKey])) {
                    found = found || subArray[subKey].search(regexp) > -1;
                  }
                });
              }
              return found;
            });
            return found;
          });
        if (foundResults.length > 0) {
          return [
            200,
            foundResults
          ];
        } else {
          return [404];
        }
      } else {
        return [401];
      }
    });
    $httpBackend.whenGET(/search\/result\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var existingResults = _.find(mockDocuments, function (aContent) {
            return aContent.id == id;
          });
        if (!existingResults) {
          return [404];
        }
        return [
          200,
          existingResults
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenGET(/search\//).respond(function (method, url, data, headers) {
      return authenticated(headers) ? [
        200,
        mockDocuments
      ] : [401];
    });
    $httpBackend.whenPOST(/search\//).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var document = JSON.parse(data);
        var currentMaxId = _.max(mockDocuments, function (aDocument) {
            return aDocument.id;
          }).id;
        document.id = ++currentMaxId;
        document.creationDate = new Date();
        mockDocuments.push(document);
        return [
          200,
          document
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenPUT(/search\/result\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var result = JSON.parse(data);
        var existingContent = _.find(mockDocuments, function (aContent) {
            return aContent.id == id;
          });
        if (!existingContent) {
          return [404];
        }
        var index = mockDocuments.indexOf(existingContent);
        mockDocuments[index] = result;
        return [
          200,
          result
        ];
      } else {
        return [401];
      }
    });
    $httpBackend.whenDELETE(/search\/result\/[\d]/).respond(function (method, url, data, headers) {
      if (authenticated(headers)) {
        var id = url.split('/').pop();
        var existingContent = _.find(mockDocuments, function (aContent) {
            return aContent.id == id;
          });
        if (!existingContent) {
          return [404];
        }
        var index = mockDocuments.indexOf(existingContent);
        mockDocuments.splice(index, 1);
        return [200];
      } else {
        return [401];
      }
    });
  }
]);