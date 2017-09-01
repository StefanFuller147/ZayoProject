var app = angular.module('ngCalculator', ['ngRoute']); 
console.log("inside ngApp");
app.config(function($routeProvider){ 
  console.log("INSIDE config: routes");
  $routeProvider
		.when('/', {
			template: `<list-all-items-component></list-all-items-component>`,

		})
		.when('/_404',{
			template : `<h1>404</h1>`
		})
		
		.otherwise({
			redirectTo: '/'
		})
});
