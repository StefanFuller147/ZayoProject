var app = angular.module('ngCalculator');
console.log("in app component");

var getIntoAppController = function appController() {
	var vm = this;
	
	console.log("in app.component function");
}
app.component('appComponent', {
	template : `<ng-view></ng-view>`,
//	templateUrl: "<listAllItems.component.html></listAllItems.component.html>",

	controllerAs: "vm",
});