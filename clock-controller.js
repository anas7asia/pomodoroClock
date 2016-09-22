angular.module('clockApp')
    .controller('ClockController', ['$scope', '$interval', function($scope, $interval) {
        
        $scope.settings = {
            sessionLength: 3,
            breakLength: 2
        };
    
        $scope.sessionTime = $scope.settings.sessionLength;
        $scope.breakTime = $scope.settings.breakLength;
        $scope.tmpSessionTime = $scope.sessionTime;
        $scope.tmpBreakTime = $scope.breakTime;

         // set session time
         // need to redefinre temporary variables each time, they can't be autoupdated
        $scope.changeSessionTime = function(operator) {
            if(operator === 'minus' && $scope.sessionTime > 1) {
                $scope.sessionTime--;
                $scope.tmpSessionTime = $scope.sessionTime;
            }
            else if(operator === 'plus') {
                $scope.sessionTime++;
                $scope.tmpSessionTime = $scope.sessionTime;
            }
        }

        // set break time
        $scope.changeBreakTime = function(operator) {
            if(operator === 'minus' && $scope.breakTime > 1) {
                $scope.breakTime--;
                $scope.tmpBreakTime = $scope.breakTime;
            }
            else if(operator === 'plus') {
                $scope.breakTime++;
                $scope.tmpBreakTime = $scope.breakTime;
            }
        }

        var stop; // var to keep track of timer running
        $scope.startCounting = function() {
            console.log(stop);
            if ( angular.isDefined(stop) ) return;

            stop = $interval(function() {
                if ($scope.tmpSessionTime > 0) {
                    $scope.tmpSessionTime = countdown($scope.tmpSessionTime);
                    console.log($scope.tmpSessionTime);
                } 
                else {
                    if($scope.tmpBreakTime > 0) {
                        $scope.tmpBreakTime = countdown($scope.tmpBreakTime);
                        console.log($scope.tmpBreakTime);
                    }
                    else {
                        $scope.tmpBreakTime = $scope.breakTime;
                        $scope.tmpSessionTime = $scope.sessionTime;
                        $scope.startCounting();
                    }
                    // $scope.stopCounting();
                }
            }, 100);
        }

        $scope.stopCounting = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        $scope.resetCounting = function() {
            if ( angular.isDefined(stop) ) return;
            // console.log('Here in reset');
            stop = undefined;
            $scope.sessionTime = $scope.settings.sessionLength;
            $scope.breakTime = $scope.settings.breakLength;
            $scope.tmpSessionTime = $scope.sessionTime;
            $scope.tmpBreakTime = $scope.breakTime;
        }

        // algorithme to count dowm minutes and seconds 
        function countdown(time) {
            var splittedTime = time.toString().split('.');

            if(splittedTime[1] === undefined || splittedTime[1] == '00') {
                var mins = time - 1;
                var secs = .59;
                var newTime = mins + secs;
                // console.log(newTime);
                return newTime;
            }
            else {
                // shoud keep Math.round because opearating with decimals (in order to avoid 5.5899999994)
                var newTime = (Math.round((time - 0.01)*100) / 100).toFixed(2);
                // console.log(newTime);
                return newTime;
            }
             
        }

    }]);