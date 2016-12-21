$(document).ready(function () {
  var startOffset = 0,
      paginationSize = 10;

  var handleParam = function () {
    var param = location.search ? location.search.substr(3) : "";

    if (param === "success") {
      $(".notice.success").show();
    } else if (param !== "") {
      var errorDesc = "";

      switch (param) {
        case "100":
          errorDesc = "Kein File ausgewählt";
          break;
        case "101":
          errorDesc = "Mit dem File stimmt etwas nicht";
          break;
        case "200":
          errorDesc = "Nicht alle Spalten sind vorhanden, bitte überprüfen";
          break;
        case "201":
        case "202":
          errorDesc = "Nicht alle Daten vorhanden";
          break;
        case "300":
          errorDesc = "Der Datenbank-Import ist fehlgeschlagen";
          break;
        default:
          errorDesc = "Keine genaue Beschreibung vorhanden";
      }

      $("#details").html( errorDesc );
      $(".notice.error").show();
    }
  };

  /**
   * returns the last X months as a comma-separated list of strings
   * @return {String}
   */
  var getSuggestedMonths = function( nrOfMonths ) {
    var start = new Date(2015,10,1),
        now = new Date();
    var months = (now.getYear() - start.getYear()) * 12 + now.getMonth() - start.getMonth() + 1;

    var str = [];
    for( var i = (typeof nrOfMonths === "undefined" ? 0 : (months > nrOfMonths ? months - nrOfMonths : 0 ) ); i < months; i++) {
      str.push(i+1);
    };
    return str.join(", ");
  };

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


  $("#addMoreMonths").click(function( e ) {
    $("#months").append(
        '<div class="col_9">'
      + '  <input data-index="1" type="number" min="1" />'
      + '</div>'
      + '<div class="col_3">'
      + '  <button class="small"><i class="fa fa-remove"></i> </button>'
      + '</div>' );

      e.preventDefault();
      return false;
  });

  getTrackingData();

  $("#months").val( getSuggestedMonths(6) );
  $("#months").on('input', function() {
    if ($(this).val() === "alle" ) {
      $(this).val( getSuggestedMonths() );
    }
  });

  handleParam();

  $("#tutorial").on("click", function(e){
    $("#tutorialText").toggle();
    e.preventDefault();
    return false;
  });

});
