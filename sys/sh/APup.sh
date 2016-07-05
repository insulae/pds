#!/bin/sh

#VARIABLES
PDSDIR=/var/www/html/pds

ifconfig wlan0 up
/bin/sh $PDSDIR/sys/sh/iptables.sh
service isc-dhcp-server start
service hostapd start
/usr/sbin/hostapd /etc/hostapd/hostapd.conf

