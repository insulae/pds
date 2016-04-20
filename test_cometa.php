<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

while (true) {
	//echo "id: " . date("His") . "\n";
	echo "data: " . rand(1, 600) . "\n\n";
	ob_end_flush();
	flush();
	sleep(1);
}
?>
