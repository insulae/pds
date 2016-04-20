#!/bin/bash

ifconfig wlan0 down
iwconfig wlan0 channel 1 essid $HOSTNAME freq 2.422G mode ad-hoc
ifconfig wlan0 up
ifconfig wlan0 192.168.86.11 netmask 255.255.255.240

#activo dhcp
service dnsmasq start
