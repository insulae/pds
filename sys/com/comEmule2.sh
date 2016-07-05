#!/bin/bash


### stty -F /dev/ttyUSB0 cs8 19200 ignbrk -brkint -imaxbel -opost -onlcr -isig -icanon -iexten -echo -echoe -echok -echoctl -echoke noflsh -ixon -crtscts

#stty -F /dev/ttyUSB0 19200

while [ 2 == 2 ]
do
rand1=$(( ( RANDOM % 8 )  + 1 ))
rand2=$(( ( RANDOM % 7 )  + 1 ))
rand3=$(( ( RANDOM % 7 )  + 1 ))
rand4=$(( ( RANDOM % 7 )  + 1 ))
rand5=$(( ( RANDOM % 7 )  + 1 ))
rand6=$(( ( RANDOM % 7 )  + 1 ))
	echo "F0A5030"$rand1"1102"$rand2"10002BB" > ../../pdsDATA
	echo "F0A5030"$rand1"1102"$rand2"10002BB"
#	echo $rand1 > /dev/ttyUSB0
#	echo $rand1
	sleep 1
done
