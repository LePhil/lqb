$(function() {
  var LQBTracker = {
    log: function( event ) {
      console.log( new Date() + ": " + event );
    }
  };

  LQBTracker.log("init");

  /* MAIN */
  $("#loginBtn").click(function (e) {
    LQBTracker.log("loginBtn clicked");
  });

  /* DETAILS */
  $("#printBtn").click(function (e) {
    LQBTracker.log("printBtn clicked");
  });

  $("#logoutBtn").click(function (e) {
    LQBTracker.log("logoutBtn clicked");
  });
});
