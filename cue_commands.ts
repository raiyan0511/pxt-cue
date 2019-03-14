
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum CueState {
    OFF,
    ON
}

enum CueExpression
{
  SWIRL,
  BLINK,
  WINK
}

enum CueSounds{
  ALL_CLEAR,
  BOOYAH,
  CLEAR_OBSTACLE_BEHIND,
  CLEAR_OBSTACLE_IN_FRONT,
  YIKES
}

enum CueDirectionHorizontal{
    LEFT,
    RIGHT,
    FORWARD
}

enum CueDirectionVertical{
    UP,
    DOWN,
    LEVEL
}

enum CueLEDPosition{
    EARS_AND_CHEST,
    EAR_LEFT,
    EAR_RIGHT,
    CHEST,
    MAIN_BUTTON,
    ALL
}

enum CueLEDColor{
    OFF,
    RED,
    GREEN,
    BLUE,
    WHITE
}
enum CueDir
{
  FRONT,
  BACK
}
//////


//% weight=100 color=#0fbc11 icon=""
namespace cue {

    serial.redirect(
        SerialPin.USB_TX,
        SerialPin.USB_RX,
        BaudRate.BaudRate115200
    )
    serial.writeString("Reset\n");

    let RETVAL_END : string = "_";

    /**
     * Drive forward the specified distance(cm) at specified speed(cm/s) and then stop.
     * @param distance in cm
     * @param speed in cm/s
     */
    //% block="move forward|distance %distance|cm at speed %speed| cm/s"
    //% speed.min=1 speed.max=35
    //% speed.fieldOptions.precision=1
    export function moveForward(distance: number, speed: number): void {

          let time :number = (distance / speed) * 1000 // Converting to milliseconds

            let toSend: string = ("bdf " + distance.toString() +" " + speed.toString() + "\n");
            serial.writeString(toSend);
            basic.pause(time)

    }

    /**
     * Turn counter-clockwise the specified degrees at specified speed(cm/s) and then stop.
     * @param degrees counter clockwise angle to turn
     * @param speed in cm/s
     */
    //% block="do left turn|%degrees|degrees at speed %speed| degrees/second"
    //% degrees.min=1 degrees.max=180
    //% degrees.fieldOptions.precision=1
    //% speed.min=1 speed.max=35
    //% speed.fieldOptions.precision=1
    export function LeftTurn(degrees: number, speed: number): void {

           let time :number = (degrees / speed) * 1000 // Converting to milliseconds
            let toSend: string = ("bdt " + degrees.toString() +" "+ speed.toString() + "\n");
            serial.writeString(toSend);
            basic.pause(time)

    }

    /**
     * Turn clockwise the specified degrees at specified speed(cm/s) and then stop.
     * @param degrees clockwise angle to turn
     * @param speed in cm/s
     */
    //% block="do right turn|%degrees|degrees at speed %speed| degrees/second"
    //% degrees.min=1 degrees.max=180
    //% degrees.fieldOptions.precision=1
    //% speed.min=1 speed.max=35
    //% speed.fieldOptions.precision=1
    export function RightTurn(degrees: number, speed: number): void {

          let time :number = (degrees / speed) * 1000 // Converting to milliseconds
            let toSend: string = ("bdt -" + degrees.toString() +" "+ speed.toString() + "\n");
            serial.writeString(toSend);
            basic.pause(time)


    }

    /**
     * Set robot's speed - keeps moving. Add a stop in program when you want to stop the robot
     * @param left in cm/s
     * @param right in cm/s
     */
    //% block="set wheel speed|left %left|cm/s right %right|cm/s"
    //% left.min=1 left.max=35
    //% left.fieldOptions.precision=1
    //% right.min=1 right.max=35
    //% right.fieldOptions.precision=1
    export function SetWheelSpeeds(left: number, right: number): void {
        // Add code here
        let toSend: string = ("bsws " + left.toString() + " " + right.toString() + "\n");
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
     * Make cue look in a direction
     * @param d direction to look in, one of (LEFT, RIGHT, UP, DOWN)
     */
    //% block="look |horizontal %d_h| and |vertical %d_v"
    export function Look(d_h : CueDirectionHorizontal, d_v : CueDirectionVertical): void {
        // left, right, front
        let pan_angle_list: number[] = [90, -90, 0]
        // up, down, level
        let tilt_angle_list: number[] = [30, -15, 0]
        CueAdvanced.SetHeadPanAndTilt(pan_angle_list[d_h], tilt_angle_list[d_v]);
    }

    /**
     * Main Button LED (on or off)
     * @param state on or off
     */
    //% block="turn main button LED %state"
    export function TurnMainButtonLed(state: CueState): void {
        let toSend: string = ("mbm " + state.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Set color on LEDs in cue or turn them off
     * @param led
     * @param color
     */
    //% block="set|LED in %led|to color %color"
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
     * Start playing audio
     * @param sound
     */
    //% block="start playing |audio %sound"
    export function PlayAudio(sound: CueSounds): void {
        let sound_list: string[] = ["ALLCLEAR", "BOOYAH", "CLEAOBBEM", "CLEAOBINF", "EHHYIKES"]
        let toSend: string = ("sa SNCH" + sound_list[sound] + "\n");
        serial.writeString(toSend);
    }

    /**
     * Set cue's facial expression
     * @param expression
     */
    //% block="set facial expression |to %expression"
    export function ShowExpression(expression: CueExpression): void {
        let expression_list: string[] = ["0", "1", "2"]
        //let brightness : number = 1
        let toSend: string = ("se " + expression_list[expression] + " 1" + "\n");
        serial.writeString(toSend);
    }

    /**
     * Set an alert that displays on the microbit and Cue
     * @param expression
     */
    //% block="|%direction collision alert"
    export function displayAlert(direction: CueDir): void {
      let expression_list: string[] = ["f", "r"]

      basic.pause(200);
      let toSend: string = ("dst"+ expression_list[direction] + "\n");
      serial.writeString(toSend);
      basic.pause(200);

      let dist : number = parseInt(serial.readUntil(RETVAL_END));
      if(dist > 20  && dist < 40)
      {
        basic.showLeds(`
          . # . # .
          . # . # .
          . # . # .
          . . . . .
          . # . # .
          `)
          let toSend: string = ("sa SNCH" + "EHHYIKES" + "\n");
          basic.pause(200);
          serial.writeString(toSend);

      }
      else if(dist < 20)
      {
        basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
        let toSend: string = ("sa SNCH" + "WHOACHYOD" + "\n");
        basic.pause(200);
        serial.writeString(toSend);

      }
      else if(dist < 5)
      {
        basic.showLeds(`
        # . . . #
        . # . # .
        . . . . .
        # # # # #
        # . # . #
        `)
        let toSend: string = ("sa SNCH" + "OUCH" + "\n");
        basic.pause(200);
        serial.writeString(toSend);

      }
      basic.clearScreen()

    }

}
