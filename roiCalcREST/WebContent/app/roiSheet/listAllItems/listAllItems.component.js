angular.module('ngCalculator')
.component('listAllItemsComponent',{
	templateUrl : './app/roiSheet/listAllItems/listAllItems.component.html',
	controller : function(roiService, $filter, $scope){
		var vm = this;
		vm.revenueItem = [];
		vm.expenseItem = [];
		vm.oneTimeExpenseTotal = 0;
		vm.oneTimeRevenueTotal = 0;
		vm.monthlyExpenseTotal = 0;
		vm.monthlyRevenueTotal = 0;
		vm.yearlyExpenseTotal = 0;
		vm.yearlyRevenueTotal = 0;
		vm.totalContributionProfit = 0;
		vm.totalContributionMargin = 0;
		vm.monthlyContributionProfit = 0;
		
		vm.reset = function(type){
			if(type==="revenue"){
				vm.oneTimeRevenueTotal = 0;
				vm.monthlyRevenueTotal = 0;
				vm.yearlyRevenueTotal = 0;
			}
			else{
				vm.oneTimeExpenseTotal = 0;
				vm.monthlyExpenseTotal = 0;
				vm.yearlyExpenseTotal = 0;
			}
			vm.totalContributionProfit = 0;
			vm.totalContributionMargin = 0;
			vm.monthlyContributionProfit = 0;
		}
		
		
		//lists all expense items
		vm.reloadExpenseItem = function(expenseItem){
			roiService.indexOfExpenseItems().then(function(res){
				console.log(res.data);
				vm.expenseItem = res.data;
				// --<>
				vm.calculateExpense();
			})
		}
		vm.reloadExpenseItem();
		
		$scope.$on('addExpenseItem', function(e, expenseItem){
			console.log(expenseItem)
		})
		//lists all revenue items
		vm.reloadRevenueItem = function(revenueItem){
			roiService.indexOfRevenueItems().then(function(res){
				console.log(res.data);
				vm.revenueItem = res.data;
				// --<>
				vm.calculateRevenue();
			})
		}
		vm.reloadRevenueItem();
		
		$scope.$on('addRevenueItem', function(e, revenueItem){
			console.log(revenueItem)
		});
		
		//adds a revenue item
		vm.addRevenueItem = function(revenueItem){
			console.log("in add revenue item function")
			roiService.createRevenueItem(revenueItem).then(function(r){
				vm.reset('revenue');
				vm.reloadRevenueItem();
			});
		}
		
		//adds an expense item
		vm.addExpenseItem = function(expenseItem){
			console.log("in add expense item function")
			roiService.createExpenseItem(expenseItem).then(function(r){
				vm.reset('expense');
				vm.reloadExpenseItem();
			});
		}
		
		//updates an expense item
		vm.updateExpenseItem = function(expense){
		console.log(expense);
			console.log("in update expense item function")
			return roiService.updateExpenseItem(expense).then(function(r){
				vm.reset("expense");
				vm.reloadExpenseItem();
				return r;
			});
		}
		
		//updates a revenue item
		vm.updateRevenueItem = function(revenue){
			console.log(revenue)
			console.log("in update revenue item function")
			return roiService.updateRevenueItem(revenue).then(function(r){
				vm.reset("revenue")
				vm.reloadRevenueItem();
				return r;
			})
		}
		
		//deletes a revenue item
		vm.deleteRevenueItem = function(id){
			console.log("in delete revenue item")
			console.log("Revenue Item" + id)
			return roiService.removeARevenueItem(id).then(function(r){
				vm.reset('revenue');
				vm.reloadRevenueItem();
			})
		}
		
		
		//deletes an expense item
		vm.deleteExpenseItem = function(id){
			console.log("in delete expense item")
			return roiService.removeAnExpenseItem(id).then(function(r){
				vm.reset('expense');
				vm.reloadExpenseItem();
			})
		}
		
		//calculates expenses for the year 
		vm.calculateExpense = function(){
			for(var i = 0; i < vm.expenseItem.length; i++){
				vm.oneTimeExpenseTotal += vm.expenseItem[i].oneTimeCost;
			}
			for(var i = 0; i < vm.expenseItem.length; i++){
				vm.monthlyExpenseTotal += vm.expenseItem[i].monthlyCost;
			}
			vm.yearlyExpenseTotal = vm.oneTimeExpenseTotal +  vm.monthlyExpenseTotal * 12;
			
			console.log(vm.yearlyExpenseTotal)
			vm.calculateTotalContributionProfit();
			vm.calculateMonthlyContributionProfit();
			vm.calculateContributionMargin();
			vm.calculateCapitalROI();
		}
		//calculates revenue for the month and year
		vm.calculateRevenue = function(){
			for(var i = 0; i < vm.revenueItem.length; i++){
				vm.oneTimeRevenueTotal += vm.revenueItem[i].oneTimeCost;
			}
			for(var i = 0; i < vm.revenueItem.length; i++){
				vm.monthlyRevenueTotal += vm.revenueItem[i].monthlyCost;
			}
			vm.yearlyRevenueTotal = vm.oneTimeRevenueTotal + vm.monthlyRevenueTotal * 12;

			console.log(vm.yearlyRevenueTotal)
			vm.calculateTotalContributionProfit();
			vm.calculateMonthlyContributionProfit();
			vm.calculateContributionMargin();
			vm.calculateCapitalROI();

		}
		
		//calculates total contribution profit
		vm.calculateTotalContributionProfit = function(){
			vm.totalContributionProfit = (vm.yearlyRevenueTotal - vm.yearlyExpenseTotal);
		}
		
		//calculates monthly contribution profit
		vm.calculateMonthlyContributionProfit = function(){
			
			vm.monthlyContributionProfit = (vm.monthlyRevenueTotal - vm.monthlyExpenseTotal);
			console.log(vm.monthlyContributionProfit)
		}
		
		//calculates contribution margin
		vm.calculateContributionMargin = function(){
			vm.totalContributionMargin = vm.totalContributionProfit / vm.yearlyRevenueTotal
		}
		
		
		//calculates Capital ROI
		vm.calculateCapitalROI = function(){
			vm.capROI = (vm.oneTimeExpenseTotal - vm.oneTimeRevenueTotal) / vm.monthlyContributionProfit
		}
	},
	controllerAs: 'vm',
	bindings : {
		items : "<"
	}
});