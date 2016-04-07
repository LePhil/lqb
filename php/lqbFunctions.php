<?php
include 'params.php';

function isLoggedIn() {
  session_start();
  return isset( $_SESSION['loggedin'] );
}

function logout() {
  session_start();
  session_destroy();
  header('Location: index.php');
}

function dbConn() {
  $server = getServerParam();
  $user = getUserParam();
  $pass = getPassParam();
  $db = getDbParam();

  $mysqli = new mysqli($server, $user, $pass, $db);
  if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
  }
  return $mysqli;
}

function getTableName() {
  return getTableParam();
}

function goToDetails() {
  header('Location: details.php');
}

function goToIndex() {
  header('Location: index.php');
}

?>
