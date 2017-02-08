#!/bin/bash
data=/var/run/pdsDATA
touch $data
chmod 777 $data
ln -sf $data /var/www/html/pds/pdsDATA
ln -sf $data /opt/lampp/htdocs/pds/pdsDATA

while [ 1 -ne 0 ];do
	rand1=$(( ( RANDOM % 3 ) ))
	rand2=$(( ( RANDOM % 2 ) ))
	echo "000106040,"$rand1$rand2","$rand2"01,8080,9090" > $data
	echo "000106040,"$rand1$rand2","$rand2"01,8080,9090"
	sleep 0.25
done
