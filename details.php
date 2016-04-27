<?php
include 'php/lqbFunctions.php';

if ( !isLoggedIn() ) {
	goToIndex();
	exit;
}

?>
<!DOCTYPE html>
<html>
<head>
	<!-- META -->
	<title>LQB Dateneinsicht</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta name="description" content="" />

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="css/kickstart.css" media="all" />
	<link rel="stylesheet" type="text/css" href="css/style.css" media="all" />

	<!-- Javascript -->
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/kickstart.js"></script>
	<script type="text/javascript" src="js/chartjs/Chart.js"></script>
	<script type="text/javascript" src="js/underscore-min.js"></script>
	<script type="text/javascript" src="js/details.js"></script>
</head>
<body>
<div class="grid">
	<div class="col_12" style="margin-top:100px;">
		<div class="tab-content">
			<div class="col_4">
				<img src="img/uzh_logo_d_pos_web_main.jpg">
			</div>

			<h1 class="col_8">
				Daten&shy;einsicht Projekt "Lebens&shy;qualitäts-Barometer UZH"
			</h1>

			<div class="col_12">
				<p class="explanationText">Leitung: Prof. Dr. Mike Martin, Dr. Christina Röcke, Universitärer Forschungs&shy;schwerpunkt "Dynamik Gesunden Alterns", in Kooperation mit: Hansruedi Schelling, Zentrum für Gerontologie, Universität Zürich</p>
			</div>
		</div>

		<div class="col_12">
			<p class="explanationText">
				Herzlich Willkommen zur Übersicht Ihrer persönlichen Lebensqualitäts-Datenübersicht. In den folgenden Grafiken sind Ihre Lebens&shy;qualitäts&shy;angaben der vergangenen 6 Monate aufgeführt.
			</p>
		</div>

		<div class="col_12 right">
			<a class="button" target="_blank" href="print.php">Druck-Ansicht</a>
			<a class="button" href="php/logout.php">Abmelden</a>
		</div>

		<h3 class="sectionTitle col_12">Ihre Lebensqualität im Gesamtwert</h3>
		<div class="col_7 canvas-holder">
			<canvas id="chart-area1" height="300" width="600"></canvas>
		</div>
		<div class="col_5">
			<p class="explanationText">
				In dieser Grafik sehen Sie den jeweiligen monatlichen Gesamtwert Ihrer persönlichen Lebensqualität (Maximalwert: 100) im Verlauf über die Zeit.
			</p>
		</div>

		<h3 class="sectionTitle col_12">Gewichtung: <span class="smallerTitle">Wie wichtig ist Ihnen jeder einzelne Aspekt?</span></h3>
		<div class="col_5">
			<p class="explanationText">
				Für jeden Bereich Ihrer Lebensqualität haben Sie pro Monat angegeben, wie wichtig er ist relativ zu den anderen Bereichen (Gesamt: 100%). Ihre persönliche Gewichtung über die Bereiche sehen Sie rechts im Tortendiagramm dargestellt.
			</p>
			<ul id="pieLegend">
				<li><div class="color"></div><div class="text"></div></li>
				<li><div class="color"></div><div class="text"></div></li>
				<li><div class="color"></div><div class="text"></div></li>
				<li><div class="color"></div><div class="text"></div></li>
				<li><div class="color"></div><div class="text"></div></li>
			</ul>
		</div>
		<div class="col_7 canvas-holder">
			<ul class="button-bar monthButtons">
				<li><a class="changeMonthBtn" data-month="prev" href=""><i class="fa fa-caret-left"></i></a></li>
			  <li><a class="changeMonthBtn" data-month="next" href=""><i class="fa fa-caret-right"></i></a></li>
			</ul>
      <canvas id="chart-area2" width="300" height="300"></canvas>
		</div>

		<h3 class="sectionTitle col_12">Zufriedenheit: <span class="smallerTitle">Wie gut läuft es aktuell in jedem der genannten Aspekte?</span></h3>
		<div class="col_7 canvas-holder">
			<ul class="button-bar monthButtons">
				<li><a class="changeMonthBtn" data-month="prev" href=""><i class="fa fa-caret-left"></i></a></li>
				<li><a class="changeMonthBtn" data-month="next" href=""><i class="fa fa-caret-right"></i></a></li>
			</ul>
			<canvas id="chart-area3" height="450" width="600"></canvas>
		</div>
		<div class="col_5">
			<p class="explanationText">
				Für jeden der Bereiche haben Sie zudem angegeben, wie gut es für Sie im jeweiligen Monat lief.<br>
				Ihre Zufriedenheits-Angaben sehen Sie links für jeden der Bereiche in Form eines Balkens abgetragen.<br><br>
				100 bedeutet, es könnte nicht besser sein, 0 bedeutet, es könnte nicht schlimmer sein.
			</p>
		</div>

	</div>
</div> <!-- End Grid -->

</body>
</html>
