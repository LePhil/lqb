<?php

include '../php/lqbFunctions.php';

$debug = false;
if ( !$debug && !isAdmin() ) {
	exit();
}

function debug($msg) {
  global $debug;

  if ( $debug ) {
    echo $msg."<br />";
  }
}
function exitIfError($code, $msg) {
  echo "ERROR ". $code .": ".$msg;
	goToServiceWithParam($code);
  exit();
}

function clean($string) {
   return preg_replace('/[^A-Za-z0-9\-\_]/', '', $string); // Removes special chars.
}

if ( !isset($_FILES["file"])) {
  exitIfError(100, "no file selected");
} else if ($_FILES["file"]["error"] > 0) {
  exitIfError(101, $_FILES["file"]["error"]);
}

$months = explode(",", $_POST["months"]);
$months = array_map('trim', $months);

$neededOncePerPerson = [
  "code",
  "birthday"
];
$neededFiveTimesPerMonth = [
  "Aspekt_-X-_Stichwort_t-M-",
  "Zufriedenheit_-X-_t-M-",
  "Gewichtung_-X-_t-M-"
];
$neededOncePerMonth = [
  "Seiqol_t-M-"
];

//Print file details
debug("Upload: " . $_FILES["file"]["name"]);
debug("Type: " . $_FILES["file"]["type"]);
debug("Size: " . ($_FILES["file"]["size"] / 1024) . " Kb");
debug("Temp file: " . $_FILES["file"]["tmp_name"]);
debug("Months: ".$_POST["months"]);
debug("==========================");

// piece together array
//$csv = array_map('str_getcsv', file($_FILES["file"]["tmp_name"]));
$csv = array_map(function($v){return str_getcsv($v, ";");}, file($_FILES["file"]["tmp_name"]) );
array_walk($csv, function(&$a) use ($csv) {
  $a = array_combine($csv[0], $a);
});
$headers = array_shift($csv); # remove column header
$headers = array_map("strtolower", $headers); //lowercase all the way

$queryArray = [];

// check if needed headers are here
debug("Checking for errors...");
// 1: needed once
$error = false;
foreach ($neededOncePerPerson as $neededHeader) {
  $queryArray[strtolower($neededHeader)] = [];

  if(!in_array( strtolower($neededHeader), $headers)) {
    $error = true;
    debug("couldn't find ".$neededHeader);
  }
}
if ($error) { exitIfError(200, "not all needed headers present"); }

// 2: needed once per month
foreach ($neededOncePerMonth as $neededHeader) {
  foreach($months as $month){
    $word = strtolower(str_replace("-M-", $month, $neededHeader));
    $queryArray[$word] = [];

    if(!in_array($word, $headers)) {
      $error = true;
      debug("couldn't find ".$word);
    }
  }
}
if ($error) { exitIfError(201, "not all data present"); }

// 3: needed 5 times per month
foreach ($neededFiveTimesPerMonth as $neededHeader) {
  foreach($months as $month) {
    foreach ([1,2,3,4,5] as $time) {

      // fix first month..
      if ( $month == "1" && $neededHeader == "Aspekt_-X-_Stichwort_t-M-" ) {
        $neededHeaderTemp = "Aspekt_".$time."_t-M-";
      } else {
        $neededHeaderTemp = str_replace("-X-", $time, $neededHeader);
      }
      $word = strtolower(str_replace("-M-", $month, $neededHeaderTemp));
      $queryArray[$word] = [];


      if(!in_array($word, $headers)) {
        $error = true;
        debug("couldn't find ".$word);
      }
    }
  }
}
if ($error) { exitIfError(202, "not all data present"); }

// Error output
debug("==========");
debug($error ? "ERROR!" : "NO ERRORS");
debug("==========");


/**********************************
 * Create DB query to insert data *
 **********************************/
$valueArray = [];

foreach ($csv as $col => $val) {
	debug("------------------");
	debug("WORKING ON ".$val["code"]);
	debug("------------------");

	foreach ($months as $month) {
		$code = $val["code"];
		$id = $code."_".$month;
		$birthday = $val["birthday"];
		$words = [];
		$values = [];
		$weights = [];
		$total = (float)($val["SeiQoL_t".$month] ? $val["SeiQoL_t".$month] : $val["Seiqol_t".$month]);

		foreach ([1,2,3,4,5] as $n) {
			if($month == "1") {
				$word = trim($val["Aspekt_".$n."_t".$month]);
			} else {
				$word = trim($val["Aspekt_".$n."_Stichwort_t".$month]);
			}
			if(!empty($word)) {
				$words[] = "'".$word."'";
			}

			$values[] = (int)trim($val["Zufriedenheit_".$n."_t".$month]);
			$weights[] = (int)trim($val["Gewichtung_".$n."_t".$month]);
		}

		if(count($words) == 5 && count($values) == 5 && count($weights) == 5) {
			debug($id.": "
						.$val["birthday"]
						." WORDS: ".join(", ", $words)
						." VALUES: ".join(", ", $values)
						." WEIGHTS: ".join(", ", $weights)
						." TOTAL: ".$total);

			$valueArray[] = "('".$id."','".$code."','".$birthday."',".$month.",".join(", ", $words).",".join(", ", $values).",".join(", ", $weights).",".$total.")";

		} else {
			debug($val["code"]."_".$month.": EMPTY");
		}
	}
}

$pdo = new PDO('mysql:host='.getServerParam().';dbname='.getDbParam(), getUserParam(), getPassParam(),[\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);
$queryString = "INSERT IGNORE INTO `".getTableParam()."` (`id`, `code`, `birthday`, `month`, `word1`, `word2`, `word3`, `word4`, `word5`, `value1`, `value2`, `value3`, `value4`, `value5`, `weight1`, `weight2`, `weight3`, `weight4`, `weight5`, `total`) VALUES ".join(", ", $valueArray).";";
debug("QUERY: ".$queryString);

$insertValues = $pdo->prepare($queryString);
$success = $insertValues->execute();

if ($success) {
	echo "SUCCESS";
	goToServiceWithParam("success");
} else {
	exitIfError(300, "DB insert failed");
}
?>
