#!/bin/bash
echo $1 1
echo $2 2
echo $3 3
if [ "$1" == "start" ];then
	wpa_supplicant -B -iwlan0 -c wificlient.conf
	dhclient wlan0
	echo started
fi

if [ "$1" == "stop" ];then
	rmmod brcmfmac cfg80211  brcmutil
	killall dhclient
	modprobe brcmfmac
fi

if [ "$1" == "scan" ];then
	iwlist wlan0 scanning > wifilist.txt

fi

if [ "$1" == "set" ];then
	echo 'network={' > wificlient.conf
	echo 'ssid="'$2'"' >> wificlient.conf
	echo 'psk="'$3'"' >> wificlient.conf
	echo '}' >> wificlient.conf
fi

if [ "$1" == "connect" ];then
    wpa_supplicant -B -iwlan0 -c /pds/wifi_client.conf
    dhclient wlan0
fi
