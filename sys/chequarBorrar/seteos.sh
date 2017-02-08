#!/bin/sh

#VARIABLES
PDSDIR=/var/www/html/pds

#ELIMINO VIEJO Y CREO pdsDATA desde cero
rm -rf $PDSDIR/pdsDATA
touch /var/run/pdsDATA
chmod 777 /var/run/pdsDATA
ln -sf /var/run/pdsDATA $PDSDIR/pdsDATA
