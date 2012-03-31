$(function() {
	var provider_api = 'http://localhost:8000/openplanetideas-plusyou-server';
	var user_id = '123456789';
	
	var getAwards = function() {
		var url = provider_api + '/award/all/facebook-user-id/' + user_id;
		console.log(url);
		
		$.ajax({
	      url: url,
	      success: function(data) {
	        var json = $.xml2json(data)
	        console.log(data);
	      },
		}); 
	}
	
	getAwards();
});