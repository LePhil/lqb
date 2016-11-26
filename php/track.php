<?php
include 'lqbFunctions.php';

function get_client_ip() {
  $ipaddress = '';
  if (isset($_SERVER['HTTP_CLIENT_IP']))
    $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
  else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
    $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
  else if(isset($_SERVER['HTTP_X_FORWARDED']))
    $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
  else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
    $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
  else if(isset($_SERVER['HTTP_FORWARDED']))
    $ipaddress = $_SERVER['HTTP_FORWARDED'];
  else if(isset($_SERVER['REMOTE_ADDR']))
    $ipaddress = $_SERVER['REMOTE_ADDR'];
  else
    $ipaddress = NULL;
  return $ipaddress;
}

if(isset($_POST['event']) && !empty($_POST['event'])) {
  $event = $_POST['event'];
  $ip = get_client_ip();
  $origin = isset($_POST['origin']) && !empty($_POST['origin']) ? $_POST['origin'] : NULL;
  $code = isset($_POST['code']) && !empty($_POST['code']) ? $_POST['code'] : NULL;

  $pdo = new PDO('mysql:host='.getServerParam().';dbname='.getDbParam(), getUserParam(), getPassParam(),[\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);

  $stmt = $pdo->prepare("INSERT INTO .`".getTrackingTable()."` (`date`, `index`, `event`, `origin`, `ip`, `code`) VALUES (CURRENT_TIMESTAMP, NULL, ?, ?, ?, ?);");
  $stmt->execute([$event, $origin, $ip, $code]);

  //echo "EVENT: ".$event." IP: ".$ip." ORIGIN: ".$origin." CODE: ".$code;
}
?>
