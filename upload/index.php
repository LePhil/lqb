<?php
include '../php/lqbFunctions.php';

if (isAdmin() || ( isset($_POST["password"]) && $_POST["password"]==getAdminPass() ) ) {
  $_SESSION['loggedin_admin'] = true;
   goToService();
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
			<h1 class="col_12">Probandendaten hinzufügen</h1>
		</div>

    <div class="col_1"></div>
		<div class="col_10">
			<p class="explanationText">
				Bitte geben Sie Ihr Password ein, um den Upload-Service benutzen zu können.
			</p>
		</div>

		<div class="clear"></div>

		<form class="vertical center" method="post">

			<div class="col_2 left"></div>
			<div class="col_2 left">
				<p>Password:</p>
			</div>

			<div class="col_4">
				<input name="password" type="password" />
			</div>

      <div class="clear"></div>

      <div class="col_5"></div>
			<div class="col_2">
        <input class="button large" value="Login" type="submit">
      </div>

		</form>
	</div>
</div> <!-- End Grid -->
</body>
</html>
