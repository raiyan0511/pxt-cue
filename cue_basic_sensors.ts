
enum CueAcceleration{
    STRENGTH,
    X_COMPONENT,
    Y_COMPONENT,
    Z_COMPONENT
}

enum CueButton{
    MAIN_BUTTON,
    HEAD_LEFT,
    HEAD_RIGHT,
    HEAD_BACK
}

enum CueWheel{
    LEFT,
    RIGHT
}

enum CueDistanceDirection{
    FRONT_LEFT,
    FRONT_RIGHT,
    BACK
}

enum CueHeadDirectionAll{
    LEFT,
    RIGHT,
    FORWARD,
    UP,
    DOWN,
    LEVEL
}

//% weight=100 color=#0fbc11 icon=""
namespace cue {

    let RETVAL_END : string = "_";

    /**
     * Is a cue button pressed?
     * @param button button on cue
     * @return isPressed
     */
    //% block="|button %isPressed| is pressed"
    export function IsButtonPressed(button: CueButton): boolean {
        let button_list : string[] = ["m", "1", "2", "3"];
        let toSend: string = ("acc" + button_list[button] + "\n");
        serial.writeString(toSend);
        basic.pause(200);

        let retval : string = serial.readUntil(RETVAL_END);
        if (retval == "T") {
            return true;
        }
        else {
            return false;
        }
    }


    /**
     * Is cue facing a certain direction
     * @param direction
     * @return isFacing
     */
    //% block="head facing |all the way %direction"
    export function IsCueFacing(direction: CueHeadDirectionAll): boolean {
        // left, right, forward, up, down, level
        let pan_angle_list : number[] = [-90, 90, 0, 999, 999, 999];
        let tilt_angle_list : number[] = [999, 999, 999, 45, -45, 0]

        let pan_angle : number = ReadHeadPan()
        let tilt_angle : number = ReadHeadTilt()

        if (pan_angle_list[direction] == pan_angle ||
            tilt_angle_list[direction] == tilt_angle) {
            return true;
        }
        else {
            return false;
        }
    }


    /**
     * Is sound playing on cue?
     * @return isPlaying : True if any sound is playing in cue
     */
    //% block="sound playing on robot"
    export function IsSoundPlaying(): boolean {
        let toSend : string = ("spk\n");
        serial.writeString(toSend);
        basic.pause(200)

        let retval : string = serial.readUntil(RETVAL_END);
        if (retval == "T") {
            return true;
        }
        else {
            return false;
        }
    }


    /**
     * Is animation playing on cue?
     * @return isPlaying : True if animation is playing in cue
     */
    //% block="animation playing on robot"
    export function IsAnimationPlaying(): boolean {
        let toSend : string = ("ani\n");
        serial.writeString(toSend);
        basic.pause(200)

        let retval : string = serial.readUntil(RETVAL_END);
        if (retval == "T") {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Read distance to obstacle from wheel on cue
     * @param side direction from cue marked by wheels
     */
    //% block="distance to obstacle |from %side| wheel"
    export function ReadDistanceToObstacle(side: CueDistanceDirection): number {
        let side_list : string[] = ["fl", "fr", "r"];
        let toSend: string = ("dst" + side_list[side] + "\n");
        serial.writeString(toSend);
        basic.pause(200);

        let dist : number = parseInt(serial.readUntil(RETVAL_END));
        return dist;
    }

    /**
     * Read distance travelled by individual wheels in cm
     * @param wheel Left or right wheel on Cue
     */
    //% block="distance travelled |by %wheel| wheel"
    export function ReadDistanceTravelled(wheel: CueWheel): number {
        let wheel_list : string[] = ["l", "r"];
        let toSend: string = ("dtv" + wheel_list[wheel] + "\n");
        serial.writeString(toSend);
        basic.pause(200);

        let dist : number = parseInt(serial.readUntil(RETVAL_END));
        return dist;
    }
}
