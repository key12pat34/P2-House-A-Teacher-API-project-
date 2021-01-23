
// Realtor API Node.JS provided code: https://rapidapi.com/apidojo/api/realtor?endpoint=apiendpoint_e259775d-d98e-479f-8440-206d6d4fa892  
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=Atlanta&limit=100&offset=0&state_code=GA&age_min=1&beds_min=1&price_min=1&sort=relevance&baths_min=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "a32cef4e7fmshe42c5a1bfdbce17p135b01jsn21abc1df2bea",
		"x-rapidapi-host": "realtor.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

// fetch("https://realtor.p.rapidapi.com/properties/v2/list-for-sale?city=Atlanta&limit=100&offset=0&state_code=GA&age_min=1&beds_min=1&price_min=1&sort=relevance&baths_min=1", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "a32cef4e7fmshe42c5a1bfdbce17p135b01jsn21abc1df2bea",
// 		"x-rapidapi-host": "realtor.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });