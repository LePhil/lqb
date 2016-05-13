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

function goToDetails() {
  header('Location: details.php');
}

function goToIndex() {
  header('Location: index.php');
}

?>
