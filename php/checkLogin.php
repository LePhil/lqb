<?php
include 'lqbFunctions.php';

session_start();

if( isset( $_POST ) ) {
  $birthdate_day = trim( $_POST["birthdate_day"] );
  $birthdate_month = trim( $_POST["birthdate_month"] );
  $birthdate_year = trim( $_POST["birthdate_year"] );
  $code = $_POST["code"];

  $bday = $birthdate_month."/".$birthdate_day."/".$birthdate_year;
}

$returnVal = "false";

$pdo = new PDO('mysql:host='.getServerParam().';dbname='.getDbParam(), getUserParam(), getPassParam(),[\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);

$stmt = $pdo->prepare("SELECT `code` FROM `".getTableParam()."` WHERE code = ? AND birthday = ?  LIMIT 0, 1");
$stmt->execute([$code, $bday]);

if ( $stmt->rowCount() == 1 ) {
  $_SESSION['loggedin'] = true;
  $_SESSION['code'] = $code;
  $returnVal = "true";
}

if ( !$returnVal ) {
  session_destroy();
}
echo $returnVal;
?>
