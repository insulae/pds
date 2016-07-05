import serial
import sys

ser = serial.Serial('/dev/ttyAMA0', 115200, timeout=1)

while True:
        lectura = ser.readline()
        sys.stdout = open('/var/run/pdsDATA', 'w')

        if lectura.strip():
                print(lectura)
        else:
                print('errorCOM')

