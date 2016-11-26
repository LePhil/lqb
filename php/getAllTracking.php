<?php
include 'lqbFunctions.php';

if ( !isAdmin() ) {
	goToAdminIndex();
	exit;
}

$pdo = new PDO('mysql:host='.getServerParam().';dbname='.getDbParam(), getUserParam(), getPassParam(),[\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);

$stmt = $pdo->prepare('SELECT * FROM `'.getTrackingTable().'` ORDER BY `index` ASC');
$stmt->execute();

$filename = 'LQB-Tracking-Data-'.date('d.m.Y').'.csv';
$fp = fopen('php://output', 'w');
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="'.$filename.'"');
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	fputcsv($fp, $row);
}
?>
