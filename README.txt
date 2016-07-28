PREINSTALACION

/etc/rc.local

/bin/sh /var/www/html/pds/sys/sh/seteos.sh &
/bin/sh /var/www/html/pds/sys/sh/APup.sh &
/opt/vc/bin/tvservice -o turn off hdmi &
/usr/sbin/openvpn --config /etc/openvpn/client.conf &


##deprecated va en .config/openbox/autostart
#/usr/bin/python /var/www/html/pds/sys/com/serialGet.py &
#/bin/bash var/www/html/pds/sys/sh/dispOn.sh &
