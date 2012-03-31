
String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
}

var ITEM_TEMPLATE = "<li><a href='#event-details?{4}'>{0}<span class='small right'>{1}</span><div class='small'>{2}<span class='right'>{3}km away</span></div></a></li>";
var DESCRIPTION_LENGTH_LIMIT = 30;

function createResultItem(opportunity) {
	var title = opportunity.title;
	var date = dateFormat(opportunity.date, "dd/mm/yyyy");
	var description = opportunity.description;
	if (description.length > DESCRIPTION_LENGTH_LIMIT) {
		description = description.substring(0, DESCRIPTION_LENGTH_LIMIT - 3) + "...";
	};
    var id = opportunity.id;
	var distance = opportunity.distance;
	var latitude = opportunity.geoLocation.latitude;
	var longitude = opportunity.geoLocation.longitude;

	var location = new google.maps.LatLng(latitude, longitude);
	addMarker(location);

    return String.format(ITEM_TEMPLATE, title, date, description, distance, id);
}

function populateSearch(oportunities) {
	var resultList = $('#results-list');
	resultList.empty();
	$.each(oportunities, function(rowIndex) {
		var data = createResultItem(oportunities[rowIndex]);
		resultList.append(data);
	});
	resultList.listview('refresh');
}

var router = new $.mobile.Router({
    "#event-details(?:[/?](.*))?": "eventDetails",
},{
    eventDetails: function(type, match, ui){
        $.ajax({
            url: 'http://localhost:8000/openplanetideas-plusyou-provider/opportunities/'+match[1],
            success: function(data) {
                var o = $.xml2json(data)
                var html = '';
                html += '<h1>'+o.title+'</h1><p>'+o.description+'</p>';
                var interests = $.isArray(o.interests.interest) ? o.interests.interest : [o.interests.interest];
                html += '<ul class="interests">';
                $.each(interests, function() {
                    html += '<li>'+this.name+'</li>';
                });
                html += '</ul>';
                html += '<div class="divider"></div>';
                html += '<div class="where"><span class="street">'+o.address.street+'</span><span class="postcode">'+o.address.postcode+'</span></div>';
                html += '<div class="when"><span class="date">'+dateFormat(o.date, 'ddd d mmm yyyy')+'</span><span class="begin-time">@'+dateFormat(o.beginTime, 'h:MM TT')+'</span></div>';
                $('#event-details .event-details').html(html);
            },
        });
    }
}, { 
    defaultHandlerEvents: "s"
});
