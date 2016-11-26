<?php
include 'php/lqbFunctions.php';

if ( isLoggedIn() ) {
	goToDetails();
	exit;
}

?>
<!DOCTYPE html>
<html>
<head>
	<!-- META -->
	<title>Dateneinsicht Projekt "Lebensqualitäts-Barometer UZH"</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta name="description" content="" />

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="css/kickstart.css" media="all" />
	<link rel="stylesheet" type="text/css" href="css/style.css" media="all" />

	<!-- Javascript -->
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/kickstart.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript" src="js/tracker.js"></script>
</head>
<body>
<div class="grid">

	<div class="col_12 right">
		<a href="upload/">Admin</a>
	</div>

	<div class="col_12" style="margin-top:60px;">
		<div class="tab-content">

			<h1 class="col_12">
				Daten&shy;einsicht Projekt "Lebensqualitäts-Barometer UZH"
			</h1>

			<div class="col_4">
				<img src="img/uzh_logo_d_pos_web_main.jpg">
			</div>

			<div class="col_8">
				<p class="explanationText">Leitung: Prof. Dr. Mike Martin, Dr. Christina Röcke, Universitärer Forschungs&shy;schwerpunkt "Dynamik Gesunden Alterns",<br>in Kooperation mit: Hansruedi Schelling, Zentrum für Gerontologie, Universität Zürich</p>
			</div>

		</div>

		<div class="col_1"></div>
		<div class="col_10">
			<p class="explanationText">
				Herzlich willkommen bei der Dateneinsicht der Studie "Lebensqualitätsbarometer"!<br><br>
				Hier können Sie Ihre Daten aus der Studie einsehen. Aus Sicherheits- und Datenschutzgründen müssen Sie sich zuerst mit Ihrem <b>Geburtsdatum</b> und ihrem persönlichen <b>Zugangscode</b> anmelden. Der persönliche Zugangscode umfasst 5 Zeichen und ist derselbe, den Sie auch beim monatlichen Fragebogen benutzen.
			</p>
		</div>

		<div class="clear"></div>

		<form class="vertical center">
			<div class="col_1 left"></div>
			<div class="col_4 left">
				<h6>Geburtsdatum:</h6>
			</div>

			<div class="col_2">
				<input id="birthdate_day" placeholder="Tag" type="text" />
			</div>

			<div class="col_2">
				<input id="birthdate_month" placeholder="Monat" type="text" />
			</div>

			<div class="col_2">
				<input id="birthdate_year" placeholder="Jahr" type="text" />
			</div>

			<div class="clear"></div>

			<div class="col_1 left"></div>
			<div class="col_4 left">
				<h6>Zugangscode:</h6>
			</div>

			<div class="col_6">
				<input id="code" type="text" />
			</div>

		</form>


		<div class="clear"></div>
		<div class="col_1 left"></div>
		<div class="col_10 center">

			<div class="notice error" id="errorNotification">
				<i class="icon-remove-sign icon-large"></i>
				Keine Einträge gefunden. Sind alle Angaben richtig?
				<a href="#close" class="icon-remove"></a>
			</div>

			<div class="notice warning" id="codeHint">
				<i class="icon-warning-sign icon-large"></i>
				Der Code sollte fünfstellig sein und nur aus Zahlen bestehen.
				<a href="#close" class="icon-remove"></a>
			</div>

			<div class="notice warning" id="birthdayHint">
				<i class="icon-warning-sign icon-large"></i>
				Das Geburtsdatum ist nicht korrekt eingegeben.
				<a href="#close" class="icon-remove"></a>
			</div>

			<button id="loginBtn" class="button large">Anmelden</button>
		</div>

	</div>
</div> <!-- End Grid -->
</body>
</html>
