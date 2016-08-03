#!/bin/bash

valorAnt=`cat /proc/interrupts | grep pinctrl-bcm2835 | awk '{print $2}'`
dormir=0

sudo sh -c "echo 508 > /sys/class/gpio/export"
sudo sh -c "echo 'out' > /sys/class/gpio/gpio508/direction"

estado=`cat /sys/class/gpio/gpio508/value`
while [ 1 -ne 0 ];do

	if (( $dormir <  60 ));then
                valor=`cat /proc/interrupts | grep pinctrl-bcm2835 | awk '{print $2}'`
                if (( $valor > $valorAnt ));then
                        dormir=0
		else
			let dormir=$dormir+2
			sleep 2
                fi
		valorAnt=$valor
	else
		sudo sh -c "echo '0' > /sys/class/gpio/gpio508/value"
		dormir=0
	fi

	#controlo para prenderla de vuelta
	estado=`cat /sys/class/gpio/gpio508/value`
	if (( $estado == 0 ));then
		echo "apago"
		while [ $estado -eq 0 ];do
			valor=`cat /proc/interrupts | grep pinctrl-bcm2835 | awk '{print $2}'`
			if (( $valor > $valorAnt ));then
				sudo sh -c "echo '1' > /sys/class/gpio/gpio508/value"
				estado=`cat /sys/class/gpio/gpio508/value`
				echo "prendo"
				dormir=0
			fi
			valorAnt=$valor
			sleep 2
		done
	fi

done
