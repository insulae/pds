#!/bin/bash

if [ "$1" == "start" ];then
	/sbin/iwconfig wlan0 mode Managed
	/pds/iptables.sh
	/sbin/ifconfig wlan0 192.168.65.1 netmask 255.255.255.0
	/usr/sbin/service isc-dhcp-server start
	/usr/sbin/hostapd /pds/hostapd.conf
	echo started
fi

if [ "$1" == "stop" ];then
	killall hostapd
	service isc-dhcp-server stop
	rmmod brcmfmac cfg80211  brcmutil
	modprobe brcmfmac
	echo stoped
fi

