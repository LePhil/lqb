<?php
include '../php/lqbFunctions.php';

if ( !isAdmin() ) {
	goToAdminIndex();
	exit;
}
?>
<!DOCTYPE html>
<html>
<head>
	<!-- META -->
	<title>Upload Probanden-Daten</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta name="description" content="" />

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="../css/kickstart.css" media="all" />
	<link rel="stylesheet" type="text/css" href="../css/style.css" media="all" />
	<link rel="stylesheet" type="text/css" href="admin.css" media="all" />

	<!-- Javascript -->
	<script type="text/javascript" src="../js/jquery.min.js"></script>
	<script type="text/javascript" src="../js/kickstart.js"></script>
	<script type="text/javascript" src="admin.js"></script>
</head>
<body>
<div class="grid">


	<div class="col_12" style="margin-top:100px;">
		<div class="tab-content">
			<h1 class="col_12">Success!</h1>
		</div>

	</div>

  <div class="col_12 right">
    <a class="button" href="../php/logout.php">Abmelden</a>
  </div>

	<div class="col_12">
		<h4>Tracking</h4>
		<ul id="tracking" class="alt">
			<li id="header"><span class="date">Datum</span><span class="event">Event</span><span class="origin">Seite</span><span class="ip">IP</span><span class="code">Code</span></li>
		</ul>
	</div>

	<div class="col_6">
		<button id="moreEarlier">Früher</button>
		<button id="moreLater" class="disabled">Später</button>
	</div>

	<div class="col_6 right">
		<a class="button" id="downloadAll" href="../php/getAllTracking.php" target="_blank">Alles herunterladen (CSV)</a>
	</div>

</div>
</body>
</html>
