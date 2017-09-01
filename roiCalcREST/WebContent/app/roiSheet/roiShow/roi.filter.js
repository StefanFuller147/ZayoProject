angular.module('ngCalculator')
.filter('roi', function(){
	return function(wholeNumber) {
		return (wholeNumber * 100) + "%"
	}
})