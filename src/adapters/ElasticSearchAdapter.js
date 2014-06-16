'use strict';

var chellSearch = angular.module('chell-search');

var host = 'localhost';

chellSearch.service('es', function (esFactory) {
    return esFactory({
        host: 'localhost:9200'
    });
});

