
(function () {
    'use strict';

    angular
        .module('app')
        .controller('news.IndexController', Controller);

    function Controller(UserService, $http, $scope) {

var urlShowNews = "http://localhost:3000/showNews";
$http.get(urlShowNews).success( function(data) {
   $scope.dataNews =  data;
});

var urlShowNewsIt = "http://localhost:3000/showNews/it";
$http.get(urlShowNewsIt).success( function(data) {
   $scope.dataNewsIt =  data;
});
var urlShowNewsLib = "http://localhost:3000/showNews/Lib";
$http.get(urlShowNewsLib).success( function(data) {
   $scope.dataNewsLib =  data;
});


// $scope.calcelSearch = function(){
// // $("#div-editSearch").hide("show");
// $("#div-getUserBox").hide("show");
// $("#div-table").show("show");
// }

/////////////////////BUTTON SELECT NEWS///////////////////////
$scope.showNewsAll = function(){
$("#div-news-search").hide("show");
$("#div-news-it").hide("show");
$("#div-news-lib").hide("show");
$("#div-news-all").show("show");
// $("#div-news-all").addClass('active');
}
$scope.showNewsIt = function(){
$("#div-news-search").hide("show");
$("#div-news-all").hide("show");
$("#div-news-lib").hide("show");
$("#div-news-it").show("show");
// $("#div-news-it").addClass('active');
}
$scope.showNewsLib = function(){
$("#div-news-search").hide("show");
$("#div-news-all").hide("show");
$("#div-news-it").hide("show");
$("#div-news-lib").show("show");
// $("#div-news-lib").addClass('active');
}


/////////////BUTTON Search/////////////////////
$scope.SearchNews = [];
$scope.getNews = function(){
var urls = "http://localhost:3000/showNews/" + $scope.Search.title;
$http.get(urls).then( function(response) {
    console.log(response.data);
       if(response.data == null){
        return alert("ไม่พบข่าว "+ $scope.Search.title);
       }else {
            $scope.SearchNews = response.data;
            $(".buttonSearchUpdate").show("show");
            $("#div-news-it").hide("show");
            $("#div-news-lib").hide("show");
            $("#div-news-all").hide("show");
            $("#div-news-search").show("show");
       }
})
}






    }
})();
