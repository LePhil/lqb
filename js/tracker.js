var LQBTracker = (function () {
  var code = false;

  var setCode = function( newCode ) {
    localStorage.setItem('LQB-Code', newCode);
    code = newCode;
  };

  var forgetCode = function() {
    localStorage.clear();
  };

  var log = function( eventName ) {
    $.ajax({
      url: 'php/track.php',
      data: {
        event: eventName,
        origin: window.location.pathname,
        code: code ? code : null
      },
      type: 'post',
      success: function(output) {}
    });
  };

  return {
    log: log,
    setCode: setCode,
    forgetCode: forgetCode
  }
})();

if (localStorage.getItem('LQB-Code')) {
  LQBTracker.setCode( localStorage.getItem('LQB-Code') );
}

$(function() {
  LQBTracker.log("visit");

  $("#logoutBtn").click(function (e) {
    LQBTracker.log("logout");
    LQBTracker.forgetCode();
  });
  $("#printBtn").click(function (e) {
    LQBTracker.log("print opened");
  });
  $(".changeMonthBtn").click(function (e) {
    LQBTracker.log("month changed");
  });
});
