angular.module('ngCalculator')
.component('revenueItem',{
	templateUrl : 'roiSheet/newRevenueItem/newRevenueItem.component.html',
	controller: function(roiService, $scope){
		var vm = this;
		vm.revenueItemCount = 0;
		
		var getRevenueItemCount = function(){
			roiService.indexOfRevenueItems()
			.then(function(res){
				vm.revenueItemCount = res.data.length
			})
		};
		getRevenueItemCount();
		
		
		var newRevenueItem = function(){
			roiService.createRevenueItem()
			.then(function(res){
				vm.revenueItemCount = res.data.lenght
			})
		}; 
	},
	controllerAs : 'vm',
	bindings:{
		onCreate: '&'
	}
});