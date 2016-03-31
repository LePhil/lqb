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

			<h1>LQB Dateneinsicht</h1>
		</div>

		<div class="col_12">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>

		<div class="col_12 right">
			<a class="button" href="php/logout.php">Abmelden</a>
		</div>

		<h3 class="sectionTitle col_12">Total über Zeit</h3>
		<div class="col_7 canvas-holder">
			<canvas id="chart-area1" height="300" width="600"></canvas>
		</div>
		<div class="col_5">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>

		<h3 class="sectionTitle col_12">Gewichtungen</h3>
		<div class="col_5">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</div>
		<div class="col_7 canvas-holder">
			<ul class="button-bar monthButtons">
				<li><a class="changeMonthBtn" data-month="prev" href=""><i class="fa fa-caret-left"></i></a></li>
			  <li><a class="changeMonthBtn" data-month="next" href=""><i class="fa fa-caret-right"></i></a></li>
			</ul>
      <canvas id="chart-area2" width="300" height="300"></canvas>
		</div>

		<h3 class="sectionTitle col_12">Happiness</h3>
		<div class="col_7 canvas-holder">
			<ul class="button-bar monthButtons">
				<li><a class="changeMonthBtn" data-month="prev" href=""><i class="fa fa-caret-left"></i></a></li>
				<li><a class="changeMonthBtn" data-month="next" href=""><i class="fa fa-caret-right"></i></a></li>
			</ul>
			<canvas id="chart-area3" height="450" width="600"></canvas>
		</div>
		<div class="col_5">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</div>

	</div>
</div> <!-- End Grid -->

</body>
</html>
