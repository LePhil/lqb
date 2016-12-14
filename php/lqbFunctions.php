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

// MINI ADMIN PANEL
function isAdmin() {
  session_start();
  return isset( $_SESSION['loggedin_admin'] );
}

function goToAdminIndex() {
  header('Location: '.getRoot().'upload/index.php');
}

function goToService() {
  header('Location: '.getRoot().'upload/service.php');
}

function goToServiceWithParam($param) {
  header('Location: '.getRoot().'upload/service.php?p='.$param);
}

?>
