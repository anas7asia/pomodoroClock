angular.module('clockApp')
    .controller('ClockController', ['$scope', function($scope) {
        
        $scope.settings = {
                sessionLength: 25,
                breakLength: 5
            };
    

        $scope.sessionTime = $scope.settings.sessionLength;
        $scope.breakTime = $scope.settings.breakLength;


         // set session time
        $scope.changeSessionTime = function(operator) {
            if(operator === 'minus' && $scope.sessionTime > 1) {
                $scope.sessionTime--;
            }
            else if(operator === 'plus') {
                $scope.sessionTime++;
            }
        }

        // set break time
        $scope.changeBreakTime = function(operator) {
            if(operator === 'minus' && $scope.breakTime > 1) {
                $scope.breakTime--;
            }
            else if(operator === 'plus') {
                $scope.breakTime++;
            }
        }

        

    }]);