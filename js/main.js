$(document).ready(function () {

  var checkDate = function() {
    var d = $("#birthdate_day").val(),
        m = $("#birthdate_month").val(),
        y = $("#birthdate_year").val(),
        correct =  d > 0 && d <= 31 &&
                   m > 0 && m <= 12 &&
                   y > 1800 && y <= 2100;

    if ( !correct ) {
      $("#birthdayHint").show();
    }
    return correct;
  };

  var checkCode = function() {
    var code = $("#code").val(),
        correct = (code+"").length === 5;

    if ( !correct ) {
      $("#codeHint").show();
    }
    return correct;
  };

  $("#loginBtn").click( function() {
    $(".notice").hide();
    var participantCode = $("#code").val();

    LQBTracker.setCode( participantCode );

    if ( checkDate() && checkCode() ) {
      $.ajax({
        url: "php/checkLogin.php",
        data: {
          code: participantCode,
          birthdate_day: parseInt( $("#birthdate_day").val() ),
          birthdate_month: parseInt( $("#birthdate_month").val() ),
          birthdate_year: parseInt( $("#birthdate_year").val() )
        },
        type: "POST",
        success: function( data ){
          if ( data === "true" ) {
            LQBTracker.log("login successfull");
            window.location = "details.php";
          } else {
            LQBTracker.log("login failed");
            $("#errorNotification").show();
          }
        }
      });
    }

  });
});
