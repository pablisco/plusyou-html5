
String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
}

var ITEM_TEMPLATE = "<li><a href='#'>{0}<span class='small right'>{1}</span><div class='small'>{2}<span class='right'>{3}km away</span></div></a></li>";
var DESCRIPTION_LENGTH_LIMIT = 20;

function createResultItem(oportunity) {
	var title = oportunity.title;
	var date = oportunity.date;
	var description = oportunity.description;
	if (description.length > DESCRIPTION_LENGTH_LIMIT) {
		description = description.substring(0, DESCRIPTION_LENGTH_LIMIT - 3) + "...";
	};
	var distance = oportunity.distance;

	return String.format(ITEM_TEMPLATE, title, date, description, distance);
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
