#!/bin/bash

MYSQLDUMP=/opt/lampp/bin/mysqldump
FECHA=`date +%Y-%m-%d`
WORKDIR='sys/backups'
cd $WORKDIR
rm *.zip *.sql
$MYSQLDUMP -uroot -ptoor pds > pds_$FECHA.sql
zip pds_$FECHA.zip pds_$FECHA.sql > /dev/null
echo pds_$FECHA.zip
