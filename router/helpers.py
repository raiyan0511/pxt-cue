import math
import os
import sys
import glob
import re
import serial

def parse_args(input_args):
    processed_args = []
    for arg in input_args:
        processed_arg = []
        try:
            processed_arg = int(arg)
        except:
            processed_arg = arg 
        finally:
            processed_args.append(processed_arg)

    return tuple(processed_args)

def open_serial_port(baudrate, timeout=0.5):
    # look for open serial ports
    ports = serial_ports()
    com_port = get_microbit_com_port(ports)
    uart = serial.Serial(com_port, baudrate)
    uart.timeout = timeout
    return uart

def serial_ports():
    """ Returns a list of open serial ports. Got this function from the link 
        below and made modifications to return just the open port  numbers:
            https://stackoverflow.com/questions/12090503/listing-available-com-ports-with-python

        :raises EnvironmentError:
            On unsupported or unknown platforms
        :returns:
            A list of the serial ports available on the system
    """
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        # this excludes your current terminal "/dev/tty"
        ports = glob.glob('/dev/tty.usbmodem*')
    elif sys.platform.startswith('darwin'):
        ports = glob.glob('/dev/tty.usbmodem*')
    else:
        raise EnvironmentError('Unsupported platform')

    result = []

    # extract the port number 
    for port in ports:
        port_no = re.findall(r'[0-9]+', port)[0]
        result.append(port_no)
    return result

def get_microbit_com_port(ports):
    """ Takes in a list of ports, and build the string that is the name of a 
        connection. 

        If list has more than one item, asks user to choose a port number.
    """
    if len(ports) == 1:
        com_port = "/dev/tty.usbmodem" + ports[0]
    elif len(ports) > 1:
        os.system('clear')  # clear the shell
        #os.system('clear')  # clear the shell
        print("More than one serial port available. Which one do "
            "you want to choose? \t Type the port number from the list:")
        print(ports)
        inp = str(input())

        if inp in ports: # valid input
            com_port = "/dev/tty.usbmodem" + inp
        else:
            print("You entered the port number incorrectly.")
            sys.exit()
    else:
        print("No serial connections found, make sure microbit is plugged in properly.")
        sys.exit()

    return com_port

if __name__ == "__main__":
    print('This is a helper functions file, run router.py')
