//% weight=100 color=#0fbc11 icon=""
namespace cue {

    let RETVAL_END : string = "-"
    /**
     * Read Acceleration data in cm/s^2
     * @param component
     */
    //% block="acceleration of cue |along %component"
    //% advanced=true
    export function ReadAcceleration(component: CueAcceleration): number {
        let component_list : string[] = ["m", "x", "y", "z"];
        let toSend: string = ("acc" + component_list[component] + "\n");
        serial.writeString(toSend);
        basic.pause(200);
        let accn : number = parseInt(serial.readUntil(RETVAL_END));
        return accn;
    }

    /**
     * Read Gyroscope data in degrees/s^2
     * @param component
     */
    //% block="angular velocity of cue |along %component"
    //% advanced=true
    export function ReadGyroscope(component: CueAcceleration): number {
        let component_list : string[] = ["m", "x", "y", "z"];
        let toSend: string = ("gyr" + component_list[component] + "\n");
        serial.writeString(toSend);
        basic.pause(200);
        let accn : number = parseInt(serial.readUntil(RETVAL_END));
        return accn;
    }

    /**
     * Read head pan of cue in degrees
     * @return head pan(horizontal) in degrees
     */
    //% block="head pan(horizontal) angle"
    //% advanced=true
    export function ReadHeadPan(): number {
        let toSend: string = ("hp\n");
        serial.writeString(toSend);
        basic.pause(200);

        let angle : number = parseInt(serial.readUntil(RETVAL_END));
        return angle;
    }

    /**
     * Read head tilt of cue in degrees
     * @return head tilt(vertical) in degrees
     */
    //% block="head tilt(vertical) angle"
    //% advanced=true
    export function ReadHeadTilt(): number {
        let toSend: string = ("ht\n");
        serial.writeString(toSend);
        basic.pause(200);

        let angle : number = parseInt(serial.readUntil(RETVAL_END));
        return angle;
    }


}