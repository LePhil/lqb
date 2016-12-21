<?php
include 'lqbFunctions.php';

if ( !isLoggedIn() ) {
	exit;
}

$code = $_SESSION['code'];

$pdo = new PDO('mysql:host='.getServerParam().';dbname='.getDbParam(), getUserParam(), getPassParam(),[\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);

$stmt = $pdo->prepare('SELECT * FROM `'.getTableParam().'` WHERE code = ?');
$stmt->execute([$code]);

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if ($result) {
	echo json_encode( $result );
} else {
	echo "ERROR";
}
?>
