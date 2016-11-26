var LQBViz = (function () {
  var nrOfEntries = 5,
      selectedMonth,
      monthNames = [ "November", "Dezember", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober" ],
      monthNamesShort = [ "Nov.", "Dez.", "Jan.", "Feb", "März", "April", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt." ],
      pieColors =      [ "#F00", "#CF0", "#0F6", "#06F", "#C0F" ],
      pieColorsLight = [ "rgba(255, 0, 0, 0.75)", "rgba(204,255,0,0.75)", "rgba(0, 255, 102, 0.75)", "rgba(0, 102, 255, 0.75)", "rgba(204, 0, 255, 0.75)" ],
      barColors =      [ "rgba(255, 0, 0, 0.6)", "rgba(204,255,0,0.6)", "rgba(0, 255, 102, 0.6)", "rgba(0, 102, 255, 0.6)", "rgba(204, 0, 255, 0.6)" ],
      barColorsLight = [ "rgba(255, 0, 0, 0.4)", "rgba(204,255,0,0.4)", "rgba(0, 255, 102, 0.4)", "rgba(0, 102, 255, 0.4)", "rgba(204, 0, 255, 0.4)" ],
      months = [],
      chartData,
      lineChart,
      pieChart,
      barChart;


  var json2Months = function ( data ) {
    var monthsArray = [];

    _.each(data, function(val, key) {
      if ( key.indexOf("_t") <0 ) return;
      var group = parseInt( key.substr(key.lastIndexOf("_t")+2) ),
          month = _.find( monthsArray, function( m ) { return m.id === group; });

      if ( !month ) { // create new month if not found yet
        month = {
          id: group,
          words: [],
          values: [],
          weights: [],
          result: 0
        };
        monthsArray.push( month );
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

    return checkMonths( monthsArray );
  };
  var checkMonths = function ( monthsToCheck ) {
    // Remove months with no result, insufficient data, or empty words.
    // Careful: First month is different, as there wasn't a Stichwort yet.
    return _.reject( monthsToCheck, function( m ) {
      return !m.result ||
             m.words.length !== 5 ||
             m.values.length !== 5 ||
             m.weights.length !== 5 ||
             _.any( m.words, function(w){ return _.isEmpty( w.val.trim() ); });
    });
  };

  var getMonths = function () { return months; };
  var setMonths = function ( jsonData ) {
    months = json2Months( jsonData );
    selectedMonth = _.last( months );
  };

  var getNrOfEntriesPerMonth = function () { return nrOfEntries; };

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

  var get2dContext = function ( id ) { return $("#"+id)[0].getContext("2d"); };

  var updatePieLegend = function( index, text ){
    var node = $("#pieLegend li")[index];
    $(node).children(".color").css("background-color", getColors( "pie", false, index ) );
    $(node).children(".text").html( text );
  };

  var truncate = function ( string, length ) {
    return string.length > length ? string.substr( 0, length - 3 ) + "..." : string;
  };

  var createMonthButtons = function () {
    if ( months.length <= 1 ) {
      $(".monthButtons").hide(); // If there's only one (or zero) months, it's useless to draw the buttons
    } else {
      _.each( months, function ( m ) {
        $( '<li class="' + (m.id === selectedMonth.id ? "activeMonth" : "") + '">\
              <a class="changeMonthBtn month'+ m.id +'" data-month="'+ m.id +'" href="">'+ getMonthName( m.id ) +'</a>\
            </li>' ).insertBefore( ".monthButtons li:last-child" );
      }, this );
    }
  };

  var getNextMonth = function () {
    if ( selectedMonth === _.last( months ) ) {
      return _.first( months );
    } else {
      return _.find( months, function(m){ return m.id > selectedMonth.id; });
    }
  };
  var getPrevMonth = function () {
    if ( selectedMonth === _.first( months ) ) {
      return _.last( months );
    } else {
      return _.last( _.filter( months, function(m){ return m.id < selectedMonth.id; } ) );
    }
  };
  var createGraphData = function () {
    var totalBarData = [],
        totalPieData = [];

    // initial setup
    chartData = {
      "line": {
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
      "pie": {
        labels: new Array( nrOfEntries ),
        datasets: [{
          data: new Array( nrOfEntries ),
          backgroundColor: getColors( "pie", false ),
          hoverBackgroundColor: getColors( "pie", true )
        }]
      },
      "bar": {
        labels : [],
        datasets : [{
          backgroundColor : getColors( "bar", false ),
          strokeColor : "rgba(151,187,220,0.8)",
          highlightFill : getColors( "bar", true ),
          highlightStroke : "rgba(151,187,220,1)",
          data : []
        }]
      }
    };

    //from each month, get the data and put it in the chart-data containers
    _.each( months, function(m) {
      var monthName = getMonthName( m.id );

      // LINECHART
      if ( m.result && parseInt( m.result ) ) {
        chartData.line.labels.push( monthName );
        chartData.line.datasets[0].data.push(  parseInt( m.result ) );
      }

      // PIE
      totalPieData.push({
        id: m.id,
        name: monthName,
        data: []
      });

      // BARCHART
      totalBarData.push({
        id: m.id,
        name: monthName,
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

    chartData.bar.labels = _.last( totalBarData ).labels;
    chartData.bar.datasets[0].data = _.last( totalBarData ).values;

    // Fill initial month for bar chart
    for(var i = 0; i < nrOfEntries; i++) {
      chartData.pie.labels[i] = _.last( totalPieData ).data[i].label;
      chartData.pie.datasets[0].data[i] = +_.last( totalPieData ).data[i].value;
    }
  };
  var handleMonthChange = function ( e ) {
    var clickedBtnAttribute = $(e.target).data("month") || $(e.target).parent().data("month") || $(e.originalEvent.currentTarget).data("month");

    if ( clickedBtnAttribute === "next" ) {
      selectedMonth = getNextMonth();
    } else if ( clickedBtnAttribute === "prev" ) {
      selectedMonth = getPrevMonth();
    } else {
      selectedMonth = _.find( months, function(m){return m.id === +clickedBtnAttribute; });
    }

    $(".activeMonth").removeClass("activeMonth");
    $(".month" + selectedMonth.id).parent().addClass("activeMonth");

    updateGraphs();
  };

  var updateGraphs = function() {
    for( var i = 0; i < nrOfEntries; i++ ) {
      pieChart.data.datasets[0].data[i] = selectedMonth.weights[i].val;
      var val = selectedMonth.words[i].val;
      pieChart.data.labels[i] = truncate(val, 28);
      updatePieLegend( i, val );

      barChart.data.datasets[0].data[i] = +selectedMonth.values[i].val;
      barChart.data.labels[i] = truncate(val, 15);
      // TODO: allow full text in tooltip
    }

    barChart.update();
    pieChart.update();
  };

  var drawCharts = function() {
    lineChart = new Chart( get2dContext("chart-area1"), {
      type: "line",
      data: chartData.line,
      options: {
        responsive: true,
        legend: { display: false },
        scales: {
          yAxes: [{ ticks: { beginAtZero: true } }],
          xAxes: [{ ticks: { autoSkip: false /* show all labels, always */ } }]
        }
      }
    });
    pieChart = new Chart( get2dContext("chart-area2"), {
      type: "pie",
      data: chartData.pie,
      options: {
        Easing: "easeInOutQuart",
        animationSteps: 30,
        legend: { display: false }
      }
    });
    barChart = new Chart( get2dContext("chart-area3"), {
      type: "bar",
      data: chartData.bar,
      options: {
        responsive: true,
        legend: { display: false },
        scales: {
          yAxes: [{ ticks: { beginAtZero: true, min: 0, max: 100 } }]
        }
      }
    });
  };

  var processData = function ( rawData ) {
    setMonths( rawData );
    createGraphData();
    createMonthButtons();
    drawCharts();
    updateGraphs();
  };

  return {
    handleMonthChange: handleMonthChange,
    processData: processData
  };
})();
