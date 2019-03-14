# python packages
import sys
import time
import serial
import random
from threading import Thread
from threading import Lock

import WonderPy.core.wwMain
from WonderPy.core.wwConstants import WWRobotConstants

# our stuff
import helpers as hp
from dictionaries import Properties
from dictionaries import Functions
from dictionaries import Greetings

class Router(object):

    def __init__(self):
        baudrate = 115200
        self._uart = hp.open_serial_port(baudrate)
        self._event_ids = []
        self._event_history = {}
        self._last_greeting = 0
        self._queued_commands = {}

    def __del__(self):
        self._uart.close()

    def on_sensors(self, robot):
        """
        Called approximately 30 times per second - each time sensor data is received from the robot.
        This method is optional.
        Do not block in here !
        This means only call the stage_foo() flavor of robot commands, and not the do_foo() versions.        """
        self._properties.update_robot(robot)

        #print(  'obstacle (FRONT) : ', self._properties.dict['objdf'], 
        #        'obstacle (REAR) : ', self._properties.dict['objdr']
        #    )
        
        #print('Spin gyrz : ', self._properties.dict['gyrz'])
        
        #print('(L-R) z_xz: ', robot.sensors.accelerometer.degrees_z_xz())
        #print('(F-B) z_yz: ', robot.sensors.accelerometer.degrees_z_yz())
        
        #print('pan: ', robot.sensors.head_pan.degrees)
        #print('tilt: ', robot.sensors.head_tilt.degrees)
        #print('head_level: ', self._properties.dict['hfdlv'])
        if ((robot.sensors.beacon.robot_type_left_raw is not None)
            and (robot.sensors.beacon.robot_type_right_raw is not None)):
            self.greet_friend(robot)

        for event_id in self._event_ids:
            # this if statement is just a failsafe
            if isinstance(self._properties.dict[event_id], bool):
                # send to ubit only if True, we don't want to flood it with Falses
                if self._properties.dict[event_id] and self.time_is_valid(event_id):
                    self.send_retval_to_ub(event_id, delim="|", start="*")
            else:
                print("Expected event to return a bool, returned another type. THIS"
                    " SHOULD NEVER HAVE HAPPENED.")

    def time_is_valid(self, event_id):
        curr_time = time.time()
       
        if event_id not in self._event_history.keys():
            self._event_history[event_id] = curr_time
            return True

        if curr_time - self._event_history[event_id] > 0.5:
            self._event_history[event_id] = curr_time
            return True

        else:
            self._event_history[event_id] = curr_time
            return False

    def on_connect(self, robot):
        """
        Called when we connect to a robot. This method is optional. Do not Block in this method !
        """
        self._greetings = Greetings()
        self._functions = Functions(robot)
        # move the robot a bit to get access to sensor data
        robot.commands.body.stage_wheel_speeds(5,5)
        time.sleep(1)
        self._functions.dict['reset']()
        self._properties = Properties(robot)

        print("READY TO ROLL ...")


        main_thread = Thread(target=self.listener, args = (robot,))
        main_thread.start()

    def listener(self, robot):
        
        while True:
            # if time.time() - last >= 60:
            #     last = time.time()
            #     self._uart.write("#")
            # elif time.time() - last >= 20:
            #     self._uart.write(",")
            # parse the serial port input for one command
            received_cmd = self._uart.readline().split("\\n")[0].split("\x00")[-1]


            # split it into fn_key and then the args
            cmd_list = received_cmd.split()

            if len(cmd_list) > 0:
                fn_key = cmd_list[0]
                args = hp.parse_args(cmd_list[1:])
                #print('fn_key: ', fn_key)
                #print('args: ', args)    

                if fn_key in self._properties.dict.keys():
                    val = self._properties.dict[fn_key]
                    self.send_retval_to_ub(val, delim="_")

                elif fn_key in self._functions.dict.keys():
                    # execute the function
                    todo = self._functions.dict[fn_key](*args)
                    if todo is not None:
                        todo[1]['time'] += time.time()
                        self._queued_commands.update(
                            {todo[0]: todo[1]}
                        )                        

                elif fn_key == "Interrupt": 
                    if len(args) > 0:
                        self._event_ids.append(args[0])

                elif fn_key == "Reset":
                    self._functions.dict['reset']()

                else:
                    print(fn_key + " not a valid command")

            for key in self._queued_commands.keys():
                if time.time() > self._queued_commands[key]['time']:
                    self._functions.dict[key](*self._queued_commands[key]['args'])
                    del self._queued_commands[key]

    def send_retval_to_ub(self, cue_response, delim="", start=""):
        if cue_response is None:
            retval = start + delim
            print("Cue response is None. Shouldn't happen.")
        elif isinstance(cue_response, bool):
            if cue_response:
                retval = start + "T" + delim
            else:
                retval = start + "F" + delim
        elif isinstance(cue_response, str):
            retval = start + cue_response + delim
        else:
            retval = start + str(int(round(cue_response))) + delim

        #print("retval ", retval)
        self._uart.write(retval)

    def greet_friend(self, robot):
        if time.time() - self._last_greeting < 2 :
            return
        else: 
            self._last_greeting = time.time()
            random_key = random.choice(self._greetings.dict.keys())
            self._functions.dict['sa'](self._greetings.dict[random_key])

if __name__ == "__main__":
    WonderPy.core.wwMain.start(Router())
