(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);


    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("news");

        $stateProvider
            
            .state('news', {
                url: '/news',
                templateUrl: 'news/index.html',
                controller: 'news.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'news' }
            })
            // .state('pr', {
            //     url: '/pr',
            //     templateUrl: 'pr/index.html',
            //     controller: 'pr.IndexController',
            //     controllerAs: 'vm',
            //     data: { activeTab: 'pr' }
            // })
             .state('indextwo', {
                url: '/sendnews',
                templateUrl: 'indextwo.html',
                controller: 'IndexTwoController',
                controllerAs: 'vm',
                data: { activeTab: 'sendnews' }
            })
            .state('SendNews', {
                url: '/SendNews',
                templateUrl: 'SendNews/index.html',
            //     controller: 'SendNews.IndexController',
            //     controllerAs: 'vm',
            //     data: { activeTab: 'SendNews' }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('showUsers', {
                url: '/showUsers',
                templateUrl: 'showUsers/index.html',
                controller: 'showUsers.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'showUsers' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            });


            
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();