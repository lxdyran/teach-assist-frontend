(function() {

    angular.module("courseAside", [
        "ui.router"
    ]).directive("courseAside", courseAside);
        
        
    function courseAside() {
        return {
            templateUrl: "/components/course-aside/course-aside.html",
            transclude: false,
            // scope: {
            //     param: "@", //@表示取字面值
            //     users: "="  //=表示双向绑定
            // },
            controller: function($scope, $state, $rootScope) {
                // 从父控制器继承
                // $scope.course_id
                // $scope.users
                $scope.state = $state.current.name.replace("course.", "");
                
                var cleanUp = $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams, options){
                        console.log(toState);
                        $scope.state = toState.name.replace("course.", "");
                        console.log($scope.state);
                    });
                
                $scope.$on('$destroy', function() {
                    cleanUp();
                });
            }
        }
    }


})();


