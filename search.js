$(document).delegate('#search', 'pageinit', function() {
  var provider_api = 'http://localhost:8000/openplanetideas-plusyou-provider';
  var beginDate = new Date();
  beginDate.setMonth(beginDate.getMonth() - 10);
  var endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  var distance = 100;
  var latitude = 50.9;
  var longitude = 4.4;
  var vendor = 1;
  // TODO: Use Modernizr.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getOpportunities();
    });
  }
  var getOpportunities = function() {
    var url = provider_api + '/opportunities'
            + ';beginDate=' + beginDate.format("yyyymmdd")
            + ';endDate=' + endDate.format("yyyymmdd")
            + ';distance=' + distance
            + ';latitude=' + latitude
            + ';longitude=' + longitude
            + ';vendor=' + vendor;
    $.ajax({
      url: url,
      success: function(data) {
        var json = $.xml2json(data)
        var opportunities = $.isArray(json.opportunity) ? json.opportunity : [json.opportunity];
        populateSearch(opportunities);
      },
    });
  };


  $('#results-list').show();
  $('#mapButton').show();
  $('#map').hide();
  $('#listButton').hide();

$('#mapButton').bind("click", function(event, ui) {
  $('#results-list').hide();
  $('#mapButton').hide();
  $('#map').show();
  $('#listButton').show();
  // recalculte height
  var the_height = ($(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height() - $('.search-options').height());
  $('#map').height(the_height);
});

$('#listButton').bind("click", function(event, ui) {
  $('#results-list').show();
  $('#mapButton').show();
  $('#map').hide();
  $('#listButton').hide();
});

});
