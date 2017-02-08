#sudo -u pi epiphany-browser -a --profile ~/.config http://localhost/pds/display.php --display=:0 &
#sleep 10s;
#xte "key F11" -x:0

export DISPLAY=':0'
surf http://127.0.0.1/pds/display.php
