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
	echo "000106040"$rand1"002"$rand2"00"$rand5$rand3"00"$rand3$rand4"00"$rand6$rand5"000"$rand6 > ../../pdsDATA
	echo "000106040"$rand1"002"$rand2"00"$rand5$rand3"00"$rand3$rand4"00"$rand6$rand5"000"$rand6
#	echo $rand1 > /dev/ttyUSB0
#	echo $rand1
	sleep 0.1
done
