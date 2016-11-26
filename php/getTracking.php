<?php
include 'lqbFunctions.php';

if ( !isAdmin() ) {
	goToAdminIndex();
	exit;
}

$startEntry = intval( (isset($_POST['start']) && !empty($_POST['start'])) ? $_POST['start'] : 0 );

$pdo = new PDO('mysql:host='.getServerParam().';dbname='.getDbParam(), getUserParam(), getPassParam(),[\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);

$stmt = $pdo->prepare('SELECT * FROM `'.getTrackingTable().'` ORDER BY `index` DESC  LIMIT ?, 10');
$stmt->bindValue(1, $startEntry, PDO::PARAM_INT);
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($result) {
	echo json_encode( $result );
} else {
	echo "ERROR";
}
?>
