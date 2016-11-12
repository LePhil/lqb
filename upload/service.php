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

	<!-- Javascript -->
	<script type="text/javascript" src="../js/jquery.min.js"></script>
	<script type="text/javascript" src="../js/kickstart.js"></script>
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

</div> <!-- End Grid -->
</body>
</html>
