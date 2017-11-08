(function() {
	"use strict";

	var app = angular.module("productResourceMock", [ "ngMockE2E" ]);

	app
			.run(function($httpBackend) {
				var products = [
						{
							"productId" : 1,
							"productName" : "Okama Gamesphere",
							"productCode" : "GDN-0081",
							"releaseDate" : "March 19,2009",
							"description" : "The most awesome gaming console",
							"cost" : 30.00,
							"price" : 199.95,
							"category" : "game",
							"tags" : [ "video", "entertainment" ],
							"imageUrl" : "https://vignette.wikia.nocookie.net/videogamefanon/images/f/f4/1028306-okama_game_sphere_super.jpg/revision/latest?cb=20120725220238"
						},
						{
							"productId" : 2,
							"productName" : "GS-401",
							"productCode" : "GDN-0023",
							"releaseDate" : "March 18,2010",
							"description" : "Weaponized smart towel",
							"cost" : 150.00,
							"price" : 1032.99,
							"category" : "towel",
							"tags" : [ "towel", "fiber" ],
							"imageUrl" : "https://vignette.wikia.nocookie.net/villains/images/1/10/GS-401.jpg/revision/latest?cb=20150307214509"
						},
						{
							"productId" : 3,
							"productName" : "Towelie",
							"productCode" : "TBX-0022",
							"releaseDate" : "May 15,2002",
							"description" : "A lazy/ineffective towel. This product is not longer in production",
							"cost" : 6.95,
							"price" : 11.55,
							"category" : "towel",
							"tags" : [ "towel", "fiber" ],
							"imageUrl" : "http://clipart.toonarific.com/data/media/12/sp024.gif"
						},
						{
							"productId" : 4,
							"productName" : "Terrance Bobble Head",
							"productCode" : "GMG-0042",
							"releaseDate" : "October 15,2002",
							"description" : "Bobble head doll",
							"cost" : 2.22,
							"price" : 5.95,
							"category" : "decoration",
							"tags" : [ "decoration", "terrance" ],
							"imageUrl" : "https://images-na.ssl-images-amazon.com/images/I/41e1qiAAoGL._AC_UL320_SR230,320_.jpg"
						}]; //end of prouduct

				var productUrl = "/api/products";

				$httpBackend.whenGET(productUrl).respond(products); //gets all the products
				

				var regex = new RegExp(productUrl + "/[0-9][0-9]*", '');
				
				//gets a single product
				$httpBackend.whenGET(regex).respond(function(method, url, data) {
					var product = {
						"productId" : 0
					};
					var parameters = url.split("/");
					var length = parameters.length;
					var id = parameters[length - 1];
					if (id > 0) {
						for (var i = 0; i < products.length; i++) {
							if (products[i].productId == id) {
								product = products[i];
								break;
							}
						}
						;
					}
					return [ 200, product, {} ];
				});

				$httpBackend.whenPOST(productUrl).respond(function(method, url, data) {
					var product = angular.fromJson(data);
					if (!product.productId) {
						product.productId = products[products.length - 1].productId + 1;
						products.push(product);
					} else {
						for (var i = 0; i < products.length; i++) {
							if (products[i].productId == product.productId) {
								products[i] = product;
								break;
							} // end of it
						} // end of for
					}// end of else
					return [ 200, product, {} ];
				});

				// any request to /app will be ignored by mock
				$httpBackend.whenGET(/app/).passThrough();

			}) // end of app.run

})();