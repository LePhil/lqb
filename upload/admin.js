$(document).ready(function () {
  var startOffset = 0,
      paginationSize = 10;

  var getTrackingData = function() {
    $.ajax({
      url: "../php/getTracking.php",
      data: {
        start: startOffset
      },
      type: "POST",
      success: function( data ) {
        if ( data !== "ERROR" ) {
          data = JSON.parse(data);
          $("#moreEarlier").toggleClass("disabled", data.length < 10);

          $("#tracking li.event").remove();
          $.each(data, function(i, entry){
            $("#tracking").append('<li class="event"><span class="date">'+entry.date+ '</span><span class="event">'+ entry.event + '</span><span class="origin">'+entry.origin+'</span><span class="ip">'+ entry.ip + '</span><span class="code">' + entry.code +'</span></li>');
          });
        }
      }
    });
  };

  $("#moreLater").click(function(e){
    if ( $(this).hasClass("disabled") ) { return false; }

    if ( startOffset - paginationSize <= 0 ) {
      startOffset = 0;
      $("#moreLater").addClass("disabled");
    } else {
       startOffset -= paginationSize
    }
    getTrackingData();
  });
  
  $("#moreEarlier").click(function(e){
    if ( $(this).hasClass("disabled") ) { return false; }

    $("#moreLater").removeClass("disabled");
    startOffset += paginationSize
    getTrackingData();
  });

  getTrackingData();
});
