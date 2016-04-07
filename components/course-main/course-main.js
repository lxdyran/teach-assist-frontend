(function() {

    angular.module("courseMain", [
        'ui.router',
        'LocalStorageModule' ])
        .controller("courseMain", function($scope, $http, $stateParams, $location, localStorageService) {
            routeUpdate();
            $scope.course_id = $stateParams._id;
            $scope.$on('$locationChangeSuccess', routeUpdate);
            $scope.users = localStorageService.get("users");
            //console.log($scope.users);
            function routeUpdate() {
                $scope.param = $location.search().param;
            }
        });

})();


