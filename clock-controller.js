angular.module('clockApp')
    .controller('ClockController', ['$scope', function($scope) {
        $scope.sessionTime = 25;
        $scope.breakTime = 5;
    }]);