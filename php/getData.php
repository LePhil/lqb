<?php
include 'lqbFunctions.php';

if ( !isLoggedIn() ) {
	exit;
}

$code = $_SESSION['code'];

// TODO: use prepared statements
$mysqli = dbConn();

if (!mysqli_set_charset($mysqli, "utf8")) {
    printf("Error loading character set utf8: %s\n", mysqli_error($mysqli));
    exit();
}

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if ( $result = $mysqli->real_query("SELECT * FROM `".getTableName()."` WHERE code = ".$code ) ) {
  $res = $mysqli->use_result();
  $row = $res->fetch_assoc();
  echo json_encode( $row );
} else {
  echo "ERROR";
}
$mysqli->close();
?>
