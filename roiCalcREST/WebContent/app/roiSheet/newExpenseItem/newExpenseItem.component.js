angular.module('ngCalculator')
.component('expenseItem',{
	templateUrl : 'roiSheet/newExpenseItem/newExpenseItem.component.html',
	controller: function(roiService, $scope){
		var vm = this;
		vm.expenseItemCount = 0;
		
		
		var getExpenseItemCount = function(){
			roiService.indexOfExpenseItems()
			.then(function(res){
				vm.expenseItemCount = res.data.length
			})
		};
		getExpenseItemCount();
		
		
		vm.newExpenseItem = function(){
			roiService.createExpenseItem()
			.then(function(res){
				vm.expenseItemCount = res.data.length
			})
		};
	},
	controllerAs : 'vm',
	bindings:{
		onCreate: '&'
	}
});