'use strict';
var chellSearch = angular.module('chell-search');
chellSearch.run(function ($httpBackend) {

    var document0 = {
        _id: 0,
        _timestamp: new Date(),
        _type: 'user',
        _version: 2,
        _source: {
            title: 'Administrator',
            body: 'admin'
        }
    };
    var document1 = {
        _id: 1,
        _timestamp: new Date(),
        _type: 'content',
        _version: 3,
        _source: {
            title: 'Help Text',
            body: '<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>'
        }

    };

    var mockDocuments = {
        hits: {
            hits: [document0, document1]
        }
    };

    var authenticated = function (headers) {
        return true;
    };

    var index = 'chell';

    //Search
    $httpBackend.whenGET(/_search\?q=.*/).respond(function (method, url, data, headers) {
        if (authenticated(headers)) {
            var searchTerm = url.split('q=').pop();
            var regexp = new RegExp(searchTerm, 'i');
            var foundResults = mockDocuments.hits.hits.filter(function(document) {
                var found = false;
                Object.keys(document).some(function(key) {
                    if (_.isString(document[key])) {
                        found = document[key].search(regexp) > -1;
                    } else if (_.isObject(document[key])) {
                        var subArray = document[key];
                        Object.keys(subArray).some(function(subKey) {
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
                var result = {
                    hits: {
                        hits: foundResults
                    }
                };
                return [200, result];
            } else {
                return [404];
            }
        } else {
            return [401];
        }
    });
    $httpBackend.whenGET(/chell\/[\d]/).respond(function (method, url, data, headers) {
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
    // getDocumentList
    $httpBackend.whenGET(/chell\//).respond(function (method, url, data, headers) {
        return authenticated(headers) ? [
            200,
            mockDocuments
        ] : [401];
    });
    // Index
    $httpBackend.whenPOST(/chell\//).respond(function (method, url, data, headers) {
        if (authenticated(headers)) {
            var type = url.split('/').pop();
            var document = {
                _source: JSON.parse(data)
            };
            var currentMaxId = _.max(mockDocuments.hits.hits, function (aDocument) {
                return aDocument._id;
            })._id;
            document._id = ++currentMaxId;
            document._timestamp = new Date();
            document._type = type;
            mockDocuments.hits.hits.push(document);
            return [
                200,
                document
            ];
        } else {
            return [401];
        }
    });
    $httpBackend.whenPUT(/chell\/[\d]/).respond(function (method, url, data, headers) {
        if (authenticated(headers)) {
            var id = url.split('/').pop();
            var result = JSON.parse(data);
            var existingContent = _.find(mockDocuments.hits.hits, function (aContent) {
                return aContent.id == id;
            });
            if (!existingContent) {
                return [404];
            }
            var index = mockDocuments.hits.hits.indexOf(existingContent);
            mockDocuments.hits.hits[index] = result;
            return [
                200,
                result
            ];
        } else {
            return [401];
        }
    });
    $httpBackend.whenDELETE(/chell\/[\d]/).respond(function (method, url, data, headers) {
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
});


