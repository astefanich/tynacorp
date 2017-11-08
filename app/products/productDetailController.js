(function() {
	"use strict";

	angular.module("productManagement").controller("ProductDetailController",
			[ "product", "productService", ProductDetailController ]);

	function ProductDetailController(product, productService) {
		var vm = this;
		vm.product = product;

		vm.title = "Product Detail: " + vm.product.productName;

		vm.marginPercent = productService.calculateMarginPercent(vm.product.price, vm.product.cost);

		if (vm.product.tags) {
			vm.product.tagList = vm.product.tags.toString();
		}
	}
})();