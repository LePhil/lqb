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
	<!--<link rel="stylesheet" type="text/css" href="css/kickstart.css" media="all" />-->
	<link rel="stylesheet" type="text/css" href="css/style.css" media="all" />
	<link rel="stylesheet" type="text/css" href="css/print.css" media="all" />

	<!-- Javascript -->
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/kickstart.js"></script>
	<script type="text/javascript" src="js/chartjs/Chart.js"></script>
	<script type="text/javascript" src="js/underscore-min.js"></script>
	<!--<script type="text/javascript" src="js/details.js"></script>-->
	<script type="text/javascript" src="js/print.js"></script>
</head>
<body>
  <div id="print">
		<img src="img/uzh_logo_d_pos_web_main.jpg">
		<h1>LQB Daten&shy;einsicht</h1>

		<p class="explanationText">
			Herzlich Willkommen zur Übersicht Ihrer persönlichen Lebensqualitäts-Datenübersicht. In den folgenden Grafiken sind Ihre Lebensqualitätsangaben der vergangenen 6 Monate aufgeführt.
		</p>

		<h2>Ihre Lebensqualität im Gesamtwert</h2>
		<div class="canvas-holder linechartcontainer">
			<canvas id="chart-area1" height="250" width="400"></canvas>
		</div>

		<table id="lineChartTable" class="chartTable">
			<tr>
				<th>Monat</th>
				<th>Lebensqualität</th>
			</tr>
		</table>

		<p class="explanationText">
			In dieser Grafik sehen Sie den jeweiligen monatlichen Gesamtwert Ihrer persönlichen Lebensqualität (Maximalwert: 100) im Verlauf über die Zeit.
		</p>

		<h2 class="sectionTitle">Gewichtung: <span class="smallerTitle">Wie wichtig ist Ihnen jeder einzelne Aspekt?</span></h2>
		<p class="explanationText">
			Für jeden Bereich Ihrer Lebensqualität haben Sie pro Monat angegeben, wie wichtig er ist relativ zu den anderen Bereichen (Gesamt: 100%). Ihre persönliche Gewichtung über die Bereiche sehen Sie rechts im Tortendiagramm dargestellt.
		</p>

    <table id="pieChartTable">
    </table>

		<h2 class="sectionTitle 2">Zufriedenheit: <span class="smallerTitle">Wie gut läuft es aktuell in jedem der genannten Aspekte?</span></h2>
		<p class="explanationText">
			Für jeden der Bereiche haben Sie zudem angegeben, wie gut es für Sie im jeweiligen Monat lief.<br>
			Ihre Zufriedenheits-Angaben sehen Sie links für jeden der Bereiche in Form eines Balkens abgetragen.<br><br>
			100 bedeutet, es könnte nicht besser sein, 0 bedeutet, es könnte nicht schlimmer sein.
		</p>
    <div id="insertBarChart"></div>
  </div>

</body>
</html>
