(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexTwoController', Controller);


    function Controller($scope, $http, $state, $location) {

$scope.test = "12345";
var ed=tinymce.get('content');
$scope.testData = function(){
    alert(ed.getContent());
};
$scope.filename = {};
$scope.setFile = function(element) {
        $scope.$apply(function($scope) {
            $scope.theFile = element.files[0];
           $scope.filename =  $scope.theFile.name
        });
    };

$scope.addData = function(){
var urlPostNews = "http://localhost:3000/postNews";
  $http({
    method : "POST",
    url : urlPostNews,
        data: {
    'topic':$scope.topic, 'title':$scope.title,
    'group_id':$scope.group_id, 'author':$scope.author,
    'faculty':$scope.faculty, 'year':$scope.year,
    'userType':$scope.userType ,'description':ed.getContent(),
    'image': "http://localhost:3000/postNews/" + $scope.filename 
},
  }).then(function mySucces(response) {
    alert("เขียนข่าว" + $scope.title + "เสร็จสมบรูณ์");
    }, function myError(response) {
  });

  alert("เขียนข่าว" + $scope.title + "เสร็จสมบรูณ์");
$state.go('news');
};






}
}

)();