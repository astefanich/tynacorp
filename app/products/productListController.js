(function() {
	angular.module("productManagement").controller("ProductListController",
			[ "productResource", ProductListController ]);

	function ProductListController(productResource) {
		var vm = this;

		productResource.query(function(data) {
			vm.products = data;
		});
		
		vm.showImage = true;
		vm.toggleImage = function() {
			vm.showImage = !vm.showImage;
		}
	}
})();