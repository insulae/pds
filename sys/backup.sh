#!/bin/bash
DEVEL=`cat sys/devel`
if [ "$DEVEL" == "1" ];then
    MYSQLDUMP=/opt/lampp/bin/mysqldump
else
    MYSQLDUMP=/usr/bin/mysqldump
fi
FECHA=`date +%Y-%m-%d`
WORKDIR='sys/backups'
cd $WORKDIR
rm *.zip *.sql
$MYSQLDUMP -uroot -ptoor pds > pds_$1_$FECHA.sql
zip pds_$1_$FECHA.zip pds_$1_$FECHA.sql > /dev/null
echo pds_$1_$FECHA.zip
