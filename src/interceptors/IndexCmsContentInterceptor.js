'use strict';

var chellSearch = angular.module('chell-search');

chellSearch.factory('IndexCmsContentInterceptor', function ($rootScope, $q, httpBuffer, $window) {
    return {
        request: function (config) {
            if (config.url.indexOf('cms/content') > -1 && (config.method == 'POST' || config.method == 'PUT')) {
                var content = config.data;
                if (content) {
                    console.log('Content indexed: ' + content.body);
                }
            }
            return config;
        }
    };
});

chellSearch.config(function ($httpProvider) {
    $httpProvider.interceptors.push('IndexCmsContentInterceptor');
});

// Interceptor -> Type -> Registry -> ResultLayout
// Directive -> Service -> Adpater -> Interceptor