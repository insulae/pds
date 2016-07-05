#!/bin/sh

#VARIABLES
PDSDIR=/var/www/html/pds
COM=ttyAMA0

#ELIMINO VIEJO Y CREO pdsDATA desde cero
rm -rf $PDSDIR/pdsDATA
touch /var/run/pdsDATA
chmod 777 /var/run/pdsDATA
ln -sf /var/run/pdsDATA $PDSDIR/pdsDATA

#cambio permisos a com
chmod 777 /dev/$COM
