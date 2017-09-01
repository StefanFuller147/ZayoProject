angular.module('ngCalculator')
.factory('roiService', function($filter, $http, $rootScope){
	var service = {}
	
	//gets all revenue items
	service.indexOfRevenueItems = function(){
		return $http({
			method: 'GET',
				url: 'api/revenueItem'
		})
	}
	//gets all expense items
	service.indexOfExpenseItems = function(){
		return $http({
			method: 'GET',
				url: 'api/expenseItem'
		})
	}
	
	//creates a new revenue item
	service.createRevenueItem = function(revenueItem){
		return $http({
			method: 'POST',
			url: 'api/revenueItem',
			headers:{
				'Content_type':'application/json'
			},
			data: revenueItem
		})
		.then(function(res){
			console.log("in then service create")
			$rootScope.$broadcast('addRevenueItem', res.data);
			return res;
		})
	};
	
	//creates a new expense item
	service.createExpenseItem = function(expenseItem){
		return $http({
			method: 'POST',
			url: 'api/expenseItem',
			headers:{
				'Content_type':'application/json'
			},
			data: expenseItem
		})
		.then(function(res){
			$rootScope.$broadcast('addExpenseItem', res.data);
			return res;
		})
	};
	//updates an expense item
	service.updateExpenseItem = function(expenseItem, id){
		return $http({
			method: 'PUT',
			url: 'api/expenseItem/',
			headers:{
				'Content_type' : 'application/json'
			},
			data: expenseItem
		})
		.then(function(res){
			$rootScope.$broadcast('updateExpenseItem', res.data);
			return res;
		})
	};
	
	
	//updates a revenue item
	service.updateRevenueItem = function(revenueItem, id){
		return $http({
			method: 'PUT',
			url: 'api/revenueItem/',
			headers:{
				'Content_type': 'application/json'
			},
			data: revenueItem				
			})
			.then(function(res){
				$rootScope.$broadcast('updateRevenueItem', res.data);
				return res;
		})
	};
	
	
	
	//removes an expense item
	service.removeAnExpenseItem = function(id){
		return $http({
			method: 'DELETE',
			url: 'api/expenseItem/' + id
		}).then(function(res){
			console.log("deleted = " + res.data)
			return res;
		});
	};
	
	//removes a revenue item
	service.removeARevenueItem = function(id){
		console.log(id)
		 return $http({
			method: 'DELETE',
			url: 'api/revenueItem/'+ id
		}).then(function(res){
			console.log("deleted = " + res.data)
			return res;
		});
	};	

		 return service;
	});