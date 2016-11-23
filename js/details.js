var LQBViz = (function () {
  var nrOfEntries = 5,
      monthNames = [ "November", "Dezember", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober" ],
      monthNamesShort = [ "Nov.", "Dez.", "Jan.", "Feb", "März", "April", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt." ],
      pieColors =      [ "#F00", "#CF0", "#0F6", "#06F", "#C0F" ],
      pieColorsLight = [ "rgba(255, 0, 0, 0.75)", "rgba(204,255,0,0.75)", "rgba(0, 255, 102, 0.75)", "rgba(0, 102, 255, 0.75)", "rgba(204, 0, 255, 0.75)" ],
      barColors =      [ "rgba(255, 0, 0, 0.6)", "rgba(204,255,0,0.6)", "rgba(0, 255, 102, 0.6)", "rgba(0, 102, 255, 0.6)", "rgba(204, 0, 255, 0.6)" ],
      barColorsLight = [ "rgba(255, 0, 0, 0.4)", "rgba(204,255,0,0.4)", "rgba(0, 255, 102, 0.4)", "rgba(0, 102, 255, 0.4)", "rgba(204, 0, 255, 0.4)" ];

  var getNrOfEntriesPerMonth = function () {
    return nrOfEntries;
  };

  var initialSettings = function () {
    Chart.defaults.global.animation.duration = 400;
    Chart.defaults.global.animation.easing = "easeInOutQuart";
    Chart.defaults.global.scaleOverride = true;
    Chart.defaults.global.scaleSteps = 5;
    Chart.defaults.global.scaleStepWidth = 20;
    Chart.defaults.global.scaleStartValue = 0;
    Chart.defaults.global.scaleFontSize = 16;
    Chart.defaults.global.hover.mode = "nearest";
    Chart.defaults.global.tooltips.titleFontSize = 18;
    Chart.defaults.global.tooltips.bodyFontSize = 18;
  }();

  /**
   * returns a human readable month name, depending on the supplied index.
   * Since the experiment started in November 16, this is index 1.

   * @param  {Number} index
   * @return {String}
   */
  var getMonthName = function ( index ) {
    var year = (index-(index%12))/12;
    year = index%12 > 2 ? year+1 : year;
    return monthNames[ (index-1) % 12 ] + " '" + (15+year);
  };

  var getMonthNameShort = function( lqbIndex ) {
    return monthNamesShort[ (lqbIndex-1) % 12 ];
  };

  /**
   * gets a color palette or a single color
   *
   * @param  {String} type  [description]
   * @param  {Boolean} light [description]
   * @param  {Number} index  [description]
   * @return {String}       [description]
   */
  var getColors = function ( type, light, index ) {
    var arr;
    if ( type === "pie" ) {
      arr = light ? pieColorsLight : pieColors;
    } else if ( type === "bar" ) {
      arr = light ? barColorsLight : barColors;
    }

    return ( typeof index === "undefined" ) ? arr : arr[index];
  };

  var json2Months = function ( data ) {
    var months = [];

    _.each(data, function(val, key) {
      if ( key.indexOf("_t") <0 ) return;
      var group = key.substr(key.lastIndexOf("_t")+2),
          month = _.find( months, function( m ) {
            return m.id === parseInt( group );
          });

      if ( !month ) { // create new month if not found yet
        month = {
          id: parseInt( group ),
          words: [],
          values: [],
          weights: [],
          result: 0
        };
        months.push( month );
      }

      // put into correct array
      if ( key.indexOf( "Zufriedenheit" ) >= 0 ) {
        month.values.push({
          id: key.substr( key.indexOf("_t"+group) -1, 1),
          val: val ? val.trim() : ""
        });
      } else if ( key.indexOf( "Gewichtung" ) >= 0 ) {
        month.weights.push({
          id: key.substr( key.indexOf("_t"+group) -1, 1),
          val: val
        })
      } else if ( key.indexOf( "Aspekt" ) >= 0 ) {
        month.words.push({
          id: key.substr( key.indexOf( "Aspekt_" ) + 7, 1),
          val: val
        })
      } else if ( key.toLowerCase().indexOf( "seiqol" ) >= 0 ) {
        month.result = val;
      }
    });

    return checkMonths( months );
  };

  var checkMonths = function ( months ) {
    // Remove months with no result, insufficient data, or empty words.
    // Careful: First month is different, as there wasn't a Stichwort yet.
    return _.reject( months, function( m ) {
      return !m.result ||
             m.words.length !== 5 ||
             m.values.length !== 5 ||
             m.weights.length !== 5 ||
             _.any( m.words, function(w){ return _.isEmpty( w.val.trim() ); });
    });
  };

  var get2dContext = function ( id ) {
    return $("#"+id)[0].getContext("2d");
  }

  return {
    getMonthName: getMonthName,
    getMonthNameShort: getMonthNameShort,
    getColors: getColors,
    getNrOfEntriesPerMonth: getNrOfEntriesPerMonth,
    json2Months: json2Months,
    get2dContext: get2dContext
  };
})();

$(document).ready(function () {
  var currentMonth,
      months = [],
      totalBarData = [],
      totalPieData = [],
      lineChartData = {
        labels : [],
        datasets : [{
          backgroundColor : "rgba(151,187,220,0.4)",
          strokeColor : "rgb(151,187,220)",
          pointColor : "rgb(151,187,220)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgb(151,187,220)",
          data : []
        }]
      },
      pieData = function() {
        return {
          labels: new Array(LQBViz.getNrOfEntriesPerMonth()),
          datasets: [{
            data: new Array(LQBViz.getNrOfEntriesPerMonth()),
            backgroundColor: LQBViz.getColors( "pie", false ),
            hoverBackgroundColor: LQBViz.getColors( "pie", true )
          }]
        };
      }(),
      barChartData = {
        labels : [],
        datasets : [{
          backgroundColor : LQBViz.getColors( "bar", false ),
          strokeColor : "rgba(151,187,220,0.8)",
          highlightFill : LQBViz.getColors( "bar", true ),
          highlightStroke : "rgba(151,187,220,1)",
          data : []
        }]
      };

  var createMonthButtons = function() {
    // If there's only one (or zero) months, it's useless to draw the buttons
    if ( months.length <= 1 ) {
      $(".monthButtons").hide();
    } else {
      _.each( months, function( m ){
        $( '<li class="' + (m.id === currentMonth ? "activeMonth" : "") + '">\
              <a class="changeMonthBtn month'+ m.id +'" data-month="'+ m.id +'" href="">'+ LQBViz.getMonthName( m.id ) +'</a>\
            </li>' ).insertBefore( ".monthButtons li:last-child" );
      });
    }
  };

  var updatePieLegend = function( index, text ){
    var node = $("#pieLegend li")[index];
    $(node).children(".color").css("background-color", LQBViz.getColors( "pie", false, index ) );
    $(node).children(".text").html( text );
  };

  $("ul.monthButtons").on("click", ".changeMonthBtn", function( e ) {
    var nextMonth = $(e.target).data("month"),
        lastMonthID = _.last( months ).id,
        firstMonthID = _.first( months ).id;

    if ( nextMonth === undefined ) { // in case the icon on prev/next recognizes the click
      nextMonth = $(e.target).parent().data("month");
    }
    if ( nextMonth === undefined ) { // in case caret recognizes the click
      nextMonth = $(e.originalEvent.currentTarget).data("month");
    }

    if ( nextMonth === "next" ) {
      if ( currentMonth >= lastMonthID ) {
        currentMonth = firstMonthID;
      } else {
        currentMonth = _.find( months, function(m){ return m.id > currentMonth; }).id;
      }
    } else if ( nextMonth === "prev" ) {
      if ( currentMonth <= firstMonthID ) {
        currentMonth = lastMonthID;
      } else {
        currentMonth = _.last( _.filter( months, function(m){ return m.id < currentMonth; } ) ).id;
      }
    } else {
      currentMonth = +nextMonth;
    }

    $(".activeMonth").removeClass("activeMonth");
    $(".month" + currentMonth).parent().addClass("activeMonth");

    updateGraphs();

    e.stopPropagation();
    return false;
  });

  var updateGraphs = function() {
    var relevantData = _.find( months, function(m){return m.id === currentMonth; });

    for( var i = 0; i < pieChart.data.datasets[0].data.length; i++ ) {
      pieChart.data.datasets[0].data[i] = relevantData.weights[i].val;
      var val = relevantData.words[i].val;
      pieChart.data.labels[i] = ( val.length > 28 ? val.substr( 0, 25 ) + "..." : val );
      updatePieLegend( i, val );
    }

    for( var i = 0; i < barChart.data.datasets[0].data.length; i++ ) {
      barChart.data.datasets[0].data[i] = +relevantData.values[i].val;
      var val = relevantData.words[i].val;  // make label for bar chart max. 15 chars
      // TODO: allow full text in tooltip
      barChart.data.labels[i] = ( val.length > 15 ? val.substr( 0, 12 ) + "..." : val );
    }

    barChart.update();
    pieChart.update();
  };

  var drawCharts = function() {
    lineChart = new Chart( LQBViz.get2dContext("chart-area1"), {
      type: 'line',
      data: lineChartData,
      options: {
        responsive: true,
        legend: { display: false },
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
          xAxes: [{ ticks: { autoSkip: false /* show all labels, always */ } }]
        }
      }
    });

    pieChart = new Chart( LQBViz.get2dContext("chart-area2"), {
      type: 'pie',
      data: pieData,
      options: {
        Easing: "easeInOutQuart",
        animationSteps: 30,
        legend: { display: false }
      }
    });

    barChart = new Chart( LQBViz.get2dContext("chart-area3"), {
      type: 'bar',
      data: barChartData,
      options: {
        responsive: true,
        legend: { display: false },
        scales: {
          yAxes: [{ ticks: { beginAtZero: true, min: 0, max: 100 } }]
        }
      }
    });

  };

  var getData = function () {
    $.ajax({
      url: "php/getData.php",
      type: "POST",
      dataType : 'json',
      success: function ( data ) {

        months = LQBViz.json2Months( data );


        _.each( months, function(m) {
          // LINECHART
          if ( m.result && parseInt( m.result ) ) {
            lineChartData.labels.push( LQBViz.getMonthName( m.id ) );
            lineChartData.datasets[0].data.push(  parseInt( m.result ) );
          }

          // PIE
          totalPieData.push({
            id: m.id,
            name: LQBViz.getMonthName( m.id ),
            data: []
          });

          // BARCHART
          totalBarData.push({
            id: m.id,
            name: LQBViz.getMonthName( m.id ),
            labels: [],
            values: [],
            weights: []
          });
          _.each( m.words, function(w) {
            _.last( totalBarData ).labels.push( w.val );
          });
          _.each( m.values, function(v) {
            _.last( totalBarData ).values.push( v.val );
          });
          _.each( m.weights, function(w, index) {
            _.last( totalBarData ).weights.push( w.val );

            _.last( totalPieData ).data.push({
              label: _.last( totalBarData ).labels[ index ],
              value: w.val
            });
          });

        });

        // take last available month as the currently selelcted month
        currentMonth = _.last( months ).id;
        createMonthButtons();

        barChartData.labels = _.last( totalBarData ).labels;
        barChartData.datasets[0].data = _.last( totalBarData ).values;

        // Fill initial month for bar chart
        for(var i = 0; i < LQBViz.getNrOfEntriesPerMonth(); i++) {
          pieData.labels[i] = _.last( totalPieData ).data[i].label;
          pieData.datasets[0].data[i] = +_.last( totalPieData ).data[i].value;
        }

        drawCharts();
        updateGraphs();
      }
    }).fail(function( data ) {
      alert("Ein Fehler ist aufgetreten. Bitte laden Sie die Seite neu oder melden Sie sich bei der Versuchsleitung.");
    });
  };

  getData();
});
