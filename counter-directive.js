angular.module('clockApp')
    .directive('counter', function() {
        return {
            templateUrl: 'counter.html',
            scope: {
                params: '='
            },
            link: function(scope, elem, attr) {
                scope.count = function(operator) {
                    if(operator === 'minus' && scope.params.length > 1) {
                            scope.params.length--;
                    }
                    else if(operator === 'plus') {
                            scope.params.length++;
                    }
                }
            }
        }
    });