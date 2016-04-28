<?php
require("engine/base.php");
/*
$q = $db->query("
SELECT * FROM avion
");

if (mysql_error()) die(mysql_error());
while ($r = $q->fetch_object()) {
	echo $r->patente . "<br />";
}
*/
switch ($_REQUEST["accion"]) {
	case "guardar":
		echo json_encode(@$_REQUEST["voltaje"] . " - " . @$_REQUEST["amperaje"]);
	break;
	
}
?>
