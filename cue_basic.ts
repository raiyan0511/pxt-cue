
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum CueState {
    OFF,
    ON
}

enum CueDirection{
    LEFT,
    RIGHT,
    FORWARD,
    UP,
    DOWN, 
    LEVEL
}

enum CueLEDPosition{
    EARS_AND_CHEST,
    EAR_LEFT,
    EAR_RIGHT,
    CHEST,
    TOP,
    ALL
}

enum CueLEDColor{
    OFF,
    RED,
    GREEN,
    BLUE,
    WHITE
}

enum CueAcceleration{
    STRENGTH,
    X_COMPONENT,
    Y_COMPONENT,
    Z_COMPONENT
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace cue {

    serial.redirect(
        SerialPin.USB_TX,
        SerialPin.USB_RX,
        BaudRate.BaudRate115200
    )
    /**
     * Drive forward the specified distance(cm) at specified speed(cm/s) and then stop.
     * @param distance in cm
     * @param speed in cm/s
     */
    //% block="move forward|distance %distance|speed %speed"
    //% parts="cue"
    export function moveForward(distance: number, speed: number): void {
        // Add code here
        let toSend: string = ("bdf " + distance.toString() +" " + speed.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Turn counter-clockwise the specified degrees at specified speed(cm/s) and then stop.
     * @param degrees counter clockwise angle to turn 
     * @param speed in cm/s
     */
    //% block="do turn|degrees %degrees|speed %speed"
    export function DoTurn(degrees: number, speed: number): void {
        // Add code here
        let toSend: string = ("bdt " + degrees.toString() +" "+ speed.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Drive to a 'pose' within the given time and then stop.
       Be sure to understand the coordinate system.
     * @param x x coordinate position (cm)
     * @param y y coordinate position (cm)
     * @param degrees angle to turn after getting to position (x,y)
     * @param time do the pose in this time (seconds)
     */
    //% block="do pose|x %x|y %y|degrees %degrees|time %time"
    export function DoPose(x: number, y: number, degrees: number, time: number): void {
        // Add code here
        let toSend: string = ("bdp " + x.toString() + " " + y.toString() + " " + degrees.toString() + " " + time.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Stop robot.
     */
    //% block
    export function Stop(): void {
        // Add code here
        let toSend: string = ("bss" + "\n");
        serial.writeString(toSend);
    }

    /**
     * Set robot's speed - keeps moving. Add a stop in program when you want to stop the robot
     * @param left in cm/s
     * @param right in cm/s
     */
    //% block="set wheel speed|left %left|right %right"
    export function SetWheelSpeeds(left: number, right: number): void {
        // Add code here
        let toSend: string = ("bsws " + left.toString() + " " + right.toString() + "\n");
        serial.writeString(toSend);
    }


    /**
     * Set robot's speed - keeps moving. Add a stop in program when you want to stop the robot. Less accurate than Set Wheel Speeds
     * @param left in cm/s
     * @param right in cm/s
     */
    //% block="set wheel speed |left %left|right %right naive"
    //% advanced=true
    export function SetWheelSpeedsNaive(left: number, right: number): void {
        // Add code here
        let toSend: string = ("bswsn " + left.toString() + " " + right.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * This will start the robot moving with the given linear and angular speeds. If angular speed is zero, the robot will simply drive straight. If linear speed is zero, the robot will turn in place. If both linear and angular are non-zero, the robot will drive in a circle.
     * @param lin_speed : linear speed in cm/s
     * @param angular_speed : angular speed in cm/s
     */
    //% block="set linear and angular speed|linear %lin_speed|angular %angular_speed"
    export function SetLinearAndAngularSpeed(lin_speed: number, angular_speed: number): void {
        // Add code here
        let toSend: string = ("bsla " + lin_speed.toString() + " " + angular_speed.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Set cue's 'pose' within the given time. Doesn't block execution.
     * @param x 
     * @param y 
     * @param degrees
     * @param time
     */
    //% block="set pose|x %x|y %y|degrees %degrees|time %time"
    export function SetPose(x: number, y: number, degrees: number, time: number): void {
        // Add code here
        let toSend: string = ("bsp " + x.toString() + " " + y.toString() + " " + degrees.toString() + " " + time.toString() + "\n");
        serial.writeString(toSend);
    }


    /**
     * Make cue look in a direction 
     * @param d direction to look in, one of (LEFT, RIGHT, UP, DOWN)
     */
    //% block
    export function Look(d : CueDirection): void {
        let dir_list: string[] = ["l", "r", "f", "u", "d", "v"]
        let toSend: string = ("hl" + dir_list[d] + "\n");
        serial.writeString(toSend);
    
    }

    /**
     * Control Cue's pan (horizontal direction)
     * @param angle horizontal angle in degrees (-180 to 180) e.g, 45
     */
    //% block="set head pan|angle %angle"
    //% angle.min = -180, angle.max = 180
    //% angle.fieldOptions.precision=1
    export function SetHeadPan(angle: number): void {
        let toSend: string = ("hspa " + angle.toString() + "\n");
        serial.writeString(toSend);
    }

   /**
     * Control Cue's tilt (vertical direction)
     * @param angle vertical angle in degrees (-180 to 180) e.g, 45
     */
    //% block="set head tilt|angle %angle" icon="\uf204" blockGap=8
    //% angle.min=-45 angle.max=45
    //% angle.fieldOptions.precision=1
    export function SetHeadTilt(angle: number): void {
        let toSend: string = ("hsta " + angle.toString() + "\n");
        serial.writeString(toSend);
    }

   /**
     * Control Cue's pan and tilt (horizontal and vertical direction)
     * @param panAngle horizontal angle in degrees (-180 to 180) e.g, 45
     * @param tiltAngle vertical angle in degrees (-90 to 90) e.g, 45
     */
    //% block="set head|pan_angle %panAngle|tilt_angle %tiltAngle"
    //% panAngle.min = -180, panAngle.max = 180
    //% tiltAngle.min = -90, tiltAngle.max = 90
    //% panAngle.fieldOptions.precision=1 tiltAngle.fieldOptions.precision=1
    export function SetHeadPanAndTilt(panAngle: number, tiltAngle: number): void {
        let toSend: string = ("hspta " + panAngle.toString() + " " + tiltAngle.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Main Button LED (on or off)
     * @param state on or off
     */
    //% block
    export function TurnMainButtonLed(state: CueState): void {
        let toSend: string = ("mbm " + state.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Set color on Head LEDs 
     * @param led 
     * @param color
     */
    //% block="set|led in %led|to color %color"
    export function SetLEDColor(led: CueLEDPosition, color: CueLEDColor): void {
        // ears front, ears left, ears right, front, top, all
        let led_list: string[] = ["ef", "el", "er", "f", "t", "a"];
        
        // black, red, green, blue, white
        let r_list: string[] = ["0", "1", "0", "0", "1"];
        let g_list: string[] = ["0", "0", "1", "0", "1"];
        let b_list: string[] = ["0", "0", "0", "1", "1"];

        let toSend: string = ("rs" + led_list[led] + " " + r_list[color] + " " + g_list[color] + " " +b_list[color] + "\n");
        serial.writeString(toSend);
    }

    /**
     * Read Acceleration data in cm/s^2
     * @param component
     */
    //% block
    export function ReadAcceleration(component: CueAcceleration): string {
        // ears front, ears left, ears right, front, top, all
        let component_list: string[] = ["m", "x", "y", "z"];

        let toSend: string = ("acc" + component_list[component] + "\n");
        serial.writeString(toSend);
        basic.pause(1000);
        let accn : string = serial.readUntil(",");
        //serial.writeString(accn); 
        return accn;
    }

    /**
     * Read Acceleration data in cm/s^2
     * @param component
     */
/*
    //% block="on acceleration data"
    export function OnAcceleration(body: () => void) : void {
        // ears front, ears left, ears right, front, top, all
        let component_list: string[] = ["m", "x", "y", "z"];
    }
*/

    /**
     * Is animation playing on cue?
     * @return isPlaying : True if animation is playing in cue
     */
/*
    //% block
    export function IsAnimationPlaying(): boolean {
        let toSend : string = ("ani\n");
        serial.writeString(toSend);

        let retval : string = serial.readLine();

        if (retval == "T") {
            return true;
        }
        else {
            return false;
        }       
    }    
*/


}