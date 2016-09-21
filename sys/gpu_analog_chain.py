#!/usr/bin/python

import sys
import time

try:
        import Adafruit_ADS1x15
except ImportError:
        sys.stdout = open('/var/run/pdsDATA', 'w')
        print('ERRORADA')
        raise Exception('ERRORADA')

adc = Adafruit_ADS1x15.ADS1115()
GAIN = 1

period=0.100
counter = 0
ts = time.time()

# Main loop.
num = 0
values = [0]*4

t_ini = time.time()
x = 0
chain_to_send = ""
while True :
    sys.stdout = open('/var/run/pdsDATA', 'w')
    t=time.time()
    t+=period
    chain_to_send = str(t) + ','
    for i in range(4):
        values[i] = adc.read_adc(i, gain=GAIN, data_rate=128)
        chain_to_send += str(values[i]) + ','
    print (chain_to_send)
    tiempo = t-time.time()
    time.sleep(max(0,tiempo))

