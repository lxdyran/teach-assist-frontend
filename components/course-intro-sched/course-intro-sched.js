(function() {


    angular.module("courseIntroSched", [
        'ngSanitize',
        'ngCkeditor'
    ]).directive("courseIntroSched", courseIntroSched);


    function courseIntroSched() {
        return {
            templateUrl: "/components/course-intro-sched/course-intro-sched.html",
            transclude: false,
            scope: {
                param: "@", //@表示取字面值
                users: "="  //=表示双向绑定
            },
            controller: controller
        }
    }


    function controller($scope, $http, $stateParams) {
        //if ($routeParams.param !== $scope.param)
        //    return false;
        $scope.course_id = $stateParams._id;
        $scope.title = ($scope.param === "intro") ? "课程介绍" : "教学计划";
        $scope.content = null;
        $scope.isEdit = false;
        $scope.editorOptions = {};

        $http({
            method: "GET",
            url: "API/courses/"+$scope.course_id+"/"+$scope.param
        }).then(function(res) {
            var result = res.data;
            if (result.code === 0) {
                $scope.content = result[$scope.param];
                console.log(result);
            } else {
                console.error(result);
            }
        }, function(err) {
            console.error(err);
        });

        $scope.save = function() {
            var data = {};
            data[$scope.param] = $scope.content;
            $http({
                method: "PUT",
                url: "API/courses/"+$scope.course_id+"/"+$scope.param,
                data: data
            }).then(function(res) {
                var result = res.data;
                if (result.code !== 0)
                    console.error(result);
            }, function(err) {
                console.error(err);
            })
        }
    }


})();
