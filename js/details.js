$(document).ready(function () {

  $("ul.monthButtons").on("click", ".changeMonthBtn", function( e ) {
    LQBViz.handleMonthChange( e );
    e.stopPropagation();
    return false;
  });

  var getData = function () {
    $.ajax({
      url: "php/getData.php",
      type: "POST",
      dataType : 'json',
      success: LQBViz.processData
    }).fail(function( data ) {
      alert("Ein Fehler ist aufgetreten. Bitte laden Sie die Seite neu oder melden Sie sich bei der Versuchsleitung.");
    });
  };

  LQBViz.init({
    printVersion: false,
    animationDuration: 400
  });

  getData();
});
