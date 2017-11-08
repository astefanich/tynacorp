(function() {
	"use strict";

	angular.module("productManagement").controller("ProductEditController",
			[ "product", "$state", "toastr", "productService", ProductEditController ]);
	// product is a key for the product object retrieved from product resource
	// service
	// defined in app.js resolve section

	function ProductEditController(product, $state, toastr, productService) {
		// inject via resolve
		// we get the latest version from the server whenever this controller is
		// instantiated

		var vm = this;

		vm.product = product;

		vm.priceOption = "percent";

		vm.marginPercent = function() {
			return productService.calculateMarginPercent(vm.product.price, vm.product.cost);
		}

		vm.calculatePrice = function() {
			var price = 0;
			if (vm.priceOption == 'amount') {
				price = productService.calculatePriceFromMarkupAmount(vm.product.cost,
						vm.markupAmount);
			}
			if (vm.priceOption == 'percent') {
				price = productService.calculatePriceFromMarkupPercent(vm.product.cost,
						vm.markupPercent);
			}
			vm.product.price = price;
		}

		if (vm.product && vm.product.productId) {
			vm.title = "Edit: " + vm.product.productName;
		} else {
			vm.title = "New Product";
		}

		// function for opening/closing calendar
		vm.open = function($event) {
			$event.preventDefault(); // allows only this function to work
			// with this event
			$event.stopPropagation(); // stops event from being propagated
			vm.opened = !vm.opened;
		}

		// buttons from the product edit forms
		vm.submit = function() {
			vm.product.$save(function(data) {
				toastr.success("Save Successful");
			}); // $save is a built in service for resource
		}

		vm.cancel = function() {
			$state.go("productList");
		}

		vm.addTags = function(tags) {
			if (tags) {
				var array = tags.split(",");
				vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
				vm.newTags = "";
			} else {
				alert("Please enter one or more tags, separated by commas");
			}
		}

		vm.removeTag = function(idx) {
			vm.product.tags.splice(idx, 1);
		}
	}
})();