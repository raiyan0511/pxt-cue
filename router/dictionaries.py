import math

# import WonderPy.core.wwMain
# from WonderPy.core.wwConstants import WWRobotConstants
# from WonderPy.core.wwSensors import WWSensors

LEFT_PAN_ANGLE = 45
RIGHT_PAN_ANGLE = -45
UP_TILT_ANGLE = 15
DOWN_TILT_ANGLE = -5
PAN_TILT_NOISE = 2

ACC_TILT_THRESHOLD = 5
SPIN_THRESHOLD = 5

OBJ_DETECTION_THRESHOLD = 25

class Properties:
    def __init__(self, robot):
        #self.acceleration_magnitude = 0
        self.update_robot(robot, FIRST_PASS = True)

    def update_robot(self, robot, FIRST_PASS = False):
        self._robot = robot
        head_level =  (abs(robot.sensors.head_tilt.degrees) < PAN_TILT_NOISE 
                                if robot.sensors.head_tilt.degrees is not None
                                else True)
        head_forward = (abs(robot.sensors.head_pan.degrees) < PAN_TILT_NOISE 
                                if robot.sensors.head_pan.degrees is not None
                                else True)
        left_wheel_dist = 0 if FIRST_PASS else robot.sensors.wheel_left.distance
        right_wheel_dist = 0 if FIRST_PASS else robot.sensors.wheel_right.distance
        self._dict = {
            # direct API calls
            'accx': robot.sensors.accelerometer.x, 
            'accy': robot.sensors.accelerometer.y,
            'accz': robot.sensors.accelerometer.z,
            #'accm': self.acceleration_magnitude,

            'ani' : robot.sensors.animation.playing,

            'btn1' : robot.sensors.button_1.pressed,
            'btn2' : robot.sensors.button_2.pressed,
            'btn3' : robot.sensors.button_3.pressed,
            'btnm' : robot.sensors.button_main.pressed,

            'dstfl' : robot.sensors.distance_front_left_facing.distance_approximate,

            'dstfr' : robot.sensors.distance_front_right_facing.distance_approximate,

            'dstr' : robot.sensors.distance_rear.distance_approximate,

            'gyrx' : robot.sensors.gyroscope.x,
            'gyry' : robot.sensors.gyroscope.y,
            'gyrz' : robot.sensors.gyroscope.z,

            'hp' : robot.sensors.head_pan.degrees,
            'ht' : robot.sensors.head_tilt.degrees,

            'spk' : robot.sensors.speaker.playing,

            'dtvl' : left_wheel_dist,
            'dtvr' : right_wheel_dist,

            # other

            # head 
            'hfdlu': (  robot.sensors.head_pan.degrees > LEFT_PAN_ANGLE and
                        robot.sensors.head_tilt.degrees > UP_TILT_ANGLE ),

            'hfdld': (  robot.sensors.head_pan.degrees > LEFT_PAN_ANGLE and
                        robot.sensors.head_tilt.degrees < DOWN_TILT_ANGLE ),

            'hfdlv': (  robot.sensors.head_pan.degrees > LEFT_PAN_ANGLE and
                         head_level),

            'hfdru': (  robot.sensors.head_pan.degrees < RIGHT_PAN_ANGLE  and
                        robot.sensors.head_tilt.degrees > UP_TILT_ANGLE ),

            'hfdrd': (  robot.sensors.head_pan.degrees < RIGHT_PAN_ANGLE and
                        robot.sensors.head_tilt.degrees < DOWN_TILT_ANGLE ),

            'hfdrv': (  robot.sensors.head_pan.degrees < RIGHT_PAN_ANGLE and
                        head_level ),

            'hfdfu': (  head_forward and
                        robot.sensors.head_tilt.degrees > UP_TILT_ANGLE ),

            'hfdfd': (  head_forward and
                        robot.sensors.head_tilt.degrees < DOWN_TILT_ANGLE ),

            'hfdfv': (  head_forward and
                        head_level ),

            # accelerometer tilt
            # these functions are noisy
            'tltl' : robot.sensors.accelerometer.degrees_z_xz() > ACC_TILT_THRESHOLD,
            'tltr' : robot.sensors.accelerometer.degrees_z_xz() < -ACC_TILT_THRESHOLD,
            'tltf' : robot.sensors.accelerometer.degrees_z_yz() < -ACC_TILT_THRESHOLD, 
            'tltb' : robot.sensors.accelerometer.degrees_z_yz() > ACC_TILT_THRESHOLD,

            # gyroscope spin
            'gyrzl' : robot.sensors.gyroscope.z > SPIN_THRESHOLD,
            'gyrzr' : robot.sensors.gyroscope.z < -SPIN_THRESHOLD,
            
            # IR object detection
            # not very accurate
            'objdf' : (min( robot.sensors.distance_front_left_facing.distance_approximate,
                            robot.sensors.distance_front_right_facing.distance_approximate)
                        < OBJ_DETECTION_THRESHOLD ) ,
            'objdr' : robot.sensors.distance_rear.distance_approximate < OBJ_DETECTION_THRESHOLD
        }

    @property
    def dict(self):
        return self._dict

    # @property
    # def acceleration_magnitude(self):
    #     return math.sqrt(
    #                         self._robot.sensors.accelerometer.x ** 2 +
    #                         self._robot.sensors.accelerometer.y ** 2 +
    #                         self._robot.sensors.accelerometer.z ** 2
    #                     )
    #     #print('accn mag: ', self.acceleration_magnitude)

class Functions:
    def __init__(self, robot):
        self._robot = robot
        self._dict = {
            'bdf' : self.move_forward,
            'bdt' : self.do_turn,
            'bdp' : self.do_pose,
            'bss' : robot.commands.body.stage_stop,
            'bsws' : robot.commands.body.stage_wheel_speeds,
            'bswsn' : robot.commands.body.stage_wheel_speeds_naive,
            'bsla' : robot.commands.body.stage_linear_angular,
            'bsp' : robot.commands.body.stage_pose,
            'hll' : self.look_left,
            'hlr' : self.look_right,
            'hlu' : self.look_up,
            'hld' : self.look_down,
            'hlf' : self.look_forward,
            'hlv' : self.look_level,

            'hspa' : robot.commands.head.stage_pan_angle,
            'hsta' : robot.commands.head.stage_tilt_angle,
            'hspta' : robot.commands.head.stage_pan_tilt_angle,

            'rsef' : robot.commands.RGB.stage_ears_front,
            'rsel' : robot.commands.RGB.stage_ear_left,
            'rser' : robot.commands.RGB.stage_ear_right,
            'rsf' : robot.commands.RGB.stage_front,
            'rst' : robot.commands.RGB.stage_top,
            'rsa' : robot.commands.RGB.stage_all,

            'mbm' : robot.commands.monoLED.stage_button_main,
            'se' : robot.commands.eyering.stage_eyering,
            'sa' : robot.commands.media.stage_audio,

            'reset' : self.reset_robot,
        }

    def reset_robot(self):
        self._robot.sensors.wheel_left.tare()
        self._robot.sensors.wheel_right.tare()
        self._robot.commands.body.stage_stop()
        self._robot.commands.head.stage_pan_tilt_angle(0, 0)
        self._robot.commands.RGB.stage_all(0, 0, 0)
        self._dict['sa']("SNCHINITSE")
        
        

    def move_forward(self, distance, speed):
        if speed == 0: 
            return
        if distance < 0:
            speed = - speed

        time = (distance / speed) 
        self._robot.commands.body.stage_wheel_speeds(speed, speed)

        return ['bss', {'args': (), 'time': time}]

    def do_turn(self, degrees, speed):
        if speed == 0: 
            return
        if degrees < 0:
            speed = -speed 

        time = (degrees / speed) 
        self._robot.commands.body.stage_pose(0, 0, degrees, time - 0.4)  # stops faster

        return ['bss', {'args': (), 'time': time}]

    def do_pose(self, x, y, degrees, time):
        if time <= 0:
            return

        self._robot.commands.body.stage_pose(x, y, degrees, time)
        return ['bss', {'args': (), 'time': time}]

    def look_left(self):
        pan_degrees = 90
        self._robot.commands.head.stage_pan_angle(pan_degrees)

    def look_forward(self):
        pan_degrees = 0
        self._robot.commands.head.stage_pan_angle(pan_degrees)

    def look_right(self):
        pan_degrees = -90
        self._robot.commands.head.stage_pan_angle(pan_degrees)

    def look_level(self):
        tilt_degrees = 0
        self._robot.commands.head.stage_tilt_angle(tilt_degrees)

    def look_up(self):
        tilt_degrees = 45
        self._robot.commands.head.stage_tilt_angle(tilt_degrees)

    def look_down(self):
        tilt_degrees = -45
        self._robot.commands.head.stage_tilt_angle(tilt_degrees)

    @property
    def dict(self):
        return self._dict

class Greetings:
    def __init__(self):
        self._dict = {
            'hey' : "SNCHHEYTHERE",
            'howsitgoing' : "SNCHHOWSITG",
            'goodtoseeyou' : "SNCHITSGOT",
            'whatsup' : "SNCHWHATSUP",
            'whatsupfriendo' : "SNSMWHATSUPF",
            'fancymeetingyouhere' : "SNZEFANCMEYOH",
            'backoff' : "SNPEBACKOFPA",
            'heyyou' : "SNPEHEEEYYOU",
            'longtimenosee' : "SNSMLONGTINOS"
        }

    @property
    def dict(self):
        return self._dict
    
