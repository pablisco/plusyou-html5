$(function() {
  var provider_api = 'http://localhost:8000/openplanetideas-plusyou-provider';
  var beginDate = new Date();
  beginDate.setMonth(beginDate.getMonth() - 10);
  var endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);
  var distance = 100;
  var latitude = 50.9;
  var longitude = 4.4;
  var vendor = 1;
  var pad = function(n) {
    return (n < 10 ? '0' + n : '' + n);
  };
  var formatDate = function(d) {
    return '' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
  };

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
            + ';beginDate='+formatDate(beginDate)
            + ';endDate='+formatDate(endDate)
            + ';distance='+distance
            + ';latitude='+latitude
            + ';longitude='+longitude
            + ';vendor='+vendor;
    $.ajax({
      url: url,
      success: function(data) {
        var json = $.xml2json(data)
        var opportunities = $.isArray(json.opportunity) ? json.opportunity : [json.opportunity];
        populateSearch(opportunities);
      },
    });
  };
});
