$(document).ready(function () {
  var nrOfEntries = 5,
      lineChart,
      pieCharts = [],
      barCharts = [],
      monthNames = [ "November", "Dezember", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober" ],
      months = [],
      totalBarData = [],
      totalPieData = [],
      pieColors =      [ "#F00", "#CF0", "#0F6", "#06F", "#C0F" ],
      pieColorsLight = [ "rgba(255, 0, 0, 0.75)", "rgba(204,255,0,0.75)", "rgba(0, 255, 102, 0.75)", "rgba(0, 102, 255, 0.75)", "rgba(204, 0, 255, 0.75)" ],
      barColors =      [ "rgba(255, 0, 0, 0.6)", "rgba(204,255,0,0.6)", "rgba(0, 255, 102, 0.6)", "rgba(0, 102, 255, 0.6)", "rgba(204, 0, 255, 0.6)" ],
      barColorsLight = [ "rgba(255, 0, 0, 0.4)", "rgba(204,255,0,0.4)", "rgba(0, 255, 102, 0.4)", "rgba(0, 102, 255, 0.4)", "rgba(204, 0, 255, 0.4)" ],
      lineChartData = {
        labels : [],
        scaleBeginAtZero: true,
        datasets : [{
          label: "Total über Zeit",
          fillColor : "rgba(151,187,220,0.4)",
          strokeColor : "rgb(151,187,220)",
          pointColor : "rgb(151,187,220)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgb(151,187,220)",
          data : []
        }]
      },
      pieData = function() {
        var data = [];
        for( var i = 0; i < nrOfEntries; i++ ) {
          data.push({
            value: 0,
            label: "",
            color: pieColors[i],
            highlight: pieColorsLight[i]
          });
        }
        return data;
      }(),
      barData,
      barDataTemplate = {
        labels : [],
        datasets : [{
          fillColor : barColors,
          strokeColor : "rgba(151,187,220,0.8)",
          highlightFill : barColorsLight,
          highlightStroke : "rgba(151,187,220,1)",
          data : []
        }]
      };

  Chart.defaults.global.animation = false;
  Chart.defaults.global.animationSteps = 30;
  Chart.defaults.global.animationEasing = "easeInOutQuart";
  Chart.defaults.global.scaleOverride = true;
  Chart.defaults.global.scaleSteps = 5;
  Chart.defaults.global.scaleStepWidth = 20;
  Chart.defaults.global.scaleStartValue = 0;
  Chart.defaults.global.scaleFontSize = 16;

  //First month was November
  var getMonthName = function( lqbIndex ) { return monthNames[ (lqbIndex-1) % 12 ]; };

  var createChartsAndTables = function() {
    _.each( months, function( m ){
      var pieTitleHTML = '<h3>'+ getMonthName( m.id ) +'</h3>',
          pieChartHTML = '<div class="canvas-holder"><canvas height="150" width="150" class="piechart" id="piechart_' + m.id + '"></canvas></div>',
          pieLegendHTML = '<ul class="pieLegend" id="pieLegend_' + m.id + '"><li><div class="color"></div><div class="text"></div></li><li><div class="color"></div><div class="text"></div></li><li><div class="color"></div><div class="text"></div></li><li><div class="color"></div><div class="text"></div></li><li><div class="color"></div><div class="text"></div></li></ul>';

      $("#pieChartTable").append('<tr><td colspan=2>' + pieTitleHTML + '</td></tr><tr><td>' + pieChartHTML +'</td><td>' + pieLegendHTML + '</td></tr>')

      $( '<h3>'+ getMonthName( m.id ) +'</h3>' ).insertBefore( "#insertBarChart" );
      $( '<div class="canvas-holder"><canvas height="300" width="600" class="barchart" id="barchart_' + m.id + '"></canvas></div>' ).insertBefore( "#insertBarChart" );
      $( '<table id="barChartTable_'+m.id+'" class="chartTable"><tr><th>Bereich</th><th>Wert</th></tr></table>' ).insertBefore( "#insertBarChart" );
    });
  };

  var updatePieLegend = function( monthIndex, index, text, value ){
    var node = $("#pieLegend_"+ monthIndex +" li")[index];
    $(node).children(".color").css("border-color", pieColors[index] );
    $(node).children(".text").html( text + ' (' + value + '%)' );
  };

  var fillLineChartTable = function(lineChartData) {
    for( var i = 0; i < lineChartData.labels.length; i++ ) {
      var m = lineChartData.labels[i],
          v = lineChartData.datasets[0].data[i]
      $("#lineChartTable tbody").append('<tr><td>'+m+'</td><td>'+v+'</td></tr>')
    }
  };

  var fillBarChartTable = function(lineChartData) {
    for( var i = 0; i < lineChartData.labels.length; i++ ) {
      var m = lineChartData.labels[i],
          v = lineChartData.datasets[0].data[i]
      $("#lineChartTable tbody").append('<tr><td>'+m+'</td><td>'+v+'</td></tr>')
    }
  };

  var drawCharts = function() {
    var ctx = $("#chart-area1")[0].getContext("2d");
    lineChart = new Chart(ctx).Line( lineChartData );

    fillLineChartTable(lineChartData);

    var i = 0;
    _.each( months, function( m ) {
      var tempPieCTX = $("#piechart_"+ (m.id) )[0].getContext("2d"),
          tempPie = new Chart(tempPieCTX).Pie( pieData[i].data, {
            animationEasing: "easeInOutQuart",
            animationSteps: 30
          });
      _.each( pieData[i].data, function(dataPoint, relIndex){
        updatePieLegend( m.id, relIndex, dataPoint.label, dataPoint.value );
      });
      pieCharts.push(tempPie);

      var tempBarCTX = $("#barchart_"+ (m.id) )[0].getContext("2d"),
          tempBarData = _.extend( barDataTemplate, { labels: bardata[i].labels } );

      tempBarData.datasets[0].data = bardata[i].values;

      _.each( tempBarData.labels, function(val, index){
        $("#barChartTable_"+m.id+" tbody").append('<tr><td>'+ val +'</td><td>'+bardata[i].values[index]+'</td></tr>')
        tempBarData.labels[index] = val.length > 15 ? val.substr( 0, 12 ) + "..." : val;
      } );

      var tempBar = new Chart(tempBarCTX).Bar(tempBarData, {
            animationEasing: "easeInOutQuart",
            animationSteps: 30
          });
      barCharts.push(tempBar);
      i++;
    });
  };

  var getData = function() {
    $.ajax({
      url: "php/getData.php",
      type: "POST",
      dataType : 'json',
      success: function( data ){

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

        // Remove months with no result, insufficient data, or empty words.
        // Careful: First month is different, as there wasn't a Stichwort yet.
        months = _.reject( months, function(m) {
          return !m.result ||
                 m.words.length !== 5 ||
                 m.values.length !== 5 ||
                 m.weights.length !== 5 ||
                 _.any( m.words, function(w){ return _.isEmpty( w.val.trim() ); });
        });

        // limit it to the last 6 months
        months = _.last( months, 6 );

        _.each( months, function(m) {
          // LINECHART
          if ( m.result && parseInt( m.result ) ) {
            lineChartData.labels.push( getMonthName( m.id ) );
            lineChartData.datasets[0].data.push(  parseInt( m.result ) );
          }

          // PIE
          totalPieData.push({
            id: m.id,
            name: getMonthName( m.id ),
            data: []
          });

          // BARCHART
          totalBarData.push({
            id: m.id,
            name: getMonthName( m.id ),
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

        createChartsAndTables();

        bardata = totalBarData;
        pieData = totalPieData;

        drawCharts();

        window.print();
      }
    }).fail(function( data ) {});
  };

  getData();
});