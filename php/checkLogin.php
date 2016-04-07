<?php
include 'lqbFunctions.php';
//TODO: brute-force checks

session_start();

$mysqli = dbConn();

if( isset( $_POST ) ) {
  $birthdate_day = trim( $_POST["birthdate_day"] );
  $birthdate_month = trim( $_POST["birthdate_month"] );
  $birthdate_year = trim( $_POST["birthdate_year"] );
  $code = $_POST["code"];

  $bday = $birthdate_month."/".$birthdate_day."/".$birthdate_year;

  $code = mysqli_real_escape_string($mysqli, $code);
  $bday = mysqli_real_escape_string($mysqli, $bday);
}
//  $code = 10073;
//  $bday = "7/7/1938";

$returnVal = "false";

/*
$query = "SELECT `code` FROM `".getTableName()."` WHERE `code` = ? AND `birthday` = '?';";
echo sprintf("SELECT `code` FROM `".getTableName()."` WHERE `code` = %u AND `birthday` = '%s';", $code, $bday);
if ($stmt = mysqli_prepare($mysqli, $query)) {

    mysqli_stmt_bind_param($stmt, "is", $code, $bday);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $resultCode);
    mysqli_stmt_store_result($stmt);
    if ( mysqli_stmt_num_rows($stmt) === 1 ) {
      $returnVal = "true";
    }
    mysqli_stmt_close($stmt);
}
*/

if ( $result = $mysqli->real_query("SELECT `code` FROM `".getTableName()."` WHERE `code` = ".$code." AND `birthday` = '".$bday."'" ) ) {
  $res = $mysqli->use_result();
  $row = $res->fetch_assoc();

  if ( $res->num_rows === 1 || $row["code"] == $code ) {
    $_SESSION['loggedin'] = true;
    $_SESSION['code'] = $code;
    $returnVal = "true";
  }
}

if ( !$returnVal ) {
  session_destroy();
}
$mysqli->close();
echo $returnVal;
?>
