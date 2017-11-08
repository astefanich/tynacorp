(function() {
	var app = angular.module("productManagement", [ "common.services", "ui.router", "ui.mask", "ui.bootstrap", "toastr",
			, "ngMessages", "productResourceMock"]);

	app.config([ "$stateProvider", "$urlRouterProvider",
			function($stateProvider, $urlRouterProvider) {

				$stateProvider.state("home", {
					url : "/",
					templateUrl : "app/welcomeView.html"
				}).state("productList", {
					url : "/products",
					templateUrl : "app/products/productListView.html",
					controller : "ProductListController as vm"
				}).state("productEdit", {
					abstract: true,
					url : "/products/:productId",
					templateUrl : "app/products/productEditView.html",
					controller : "ProductEditController as vm",
					resolve : {
						productResource : "productResource",
						product : function(productResource, $stateParams) {
							var productId = $stateParams.productId;
							return productResource.get({
								productId : productId
							}).$promise;
						}
					}
				}).state("productEdit.info", {
					url : "/info",
					templateUrl : "app/products/productEditInfoView.html"
				}).state("productEdit.price", {
					url : "/price",
					templateUrl : "app/products/productEditPriceView.html"
				}).state("productEdit.tags", {
					url : "/tags",
					templateUrl : "app/products/productEditTagsView.html"
				}).state("productDetail", {
					url : "/products/:productId",
					templateUrl : "app/products/productDetailView.html",
					controller : "ProductDetailController as vm",
					resolve : {
						productResource : "productResource",
						product : function(productResource, $stateParams) {
							var productId = $stateParams.productId;
							return productResource.get({
								productId : productId
							}).$promise;
						}
					}
				})
				$urlRouterProvider.otherwise("/");
				// redirects to '/' when no round is found
			} ]);

})();