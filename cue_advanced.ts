//% weight=100 color=#0fbc11 icon=""
//%advanced = true
namespace CueAdvanced {

  let timePose: number = -99 * 1000 //input.runningTime()


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
     * Set robot's speed - keeps moving. Add a stop in program when you want to stop the robot. Less accurate than Set Wheel Speeds
     * @param left in cm/s
     * @param right in cm/s
     */
    //% block="set wheel speed naive |left %left|cm/s right %right|cm/s"
    export function SetWheelSpeedsNaive(left: number, right: number): void {
        // Add code here
        let toSend: string = ("bswsn " + left.toString() + " " + right.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Start moving forward with linear speed while also turning
     * @param lin_speed : linear speed in cm/s
     * @param angular_speed : angular speed in cm/s
     */
    //% block="set linear |speed %lin_speed| cm/s and angular |speed  %angular_speed degrees/s"
    export function SetLinearAndAngularSpeed(lin_speed: number, angular_speed: number): void {
        // Add code here
        let toSend: string = ("bsla " + lin_speed.toString() + " " + angular_speed.toString() + "\n");
        serial.writeString(toSend);
    }

    /**
     * Control Cue's pan (horizontal direction)
     * @param angle horizontal angle in degrees (-90 to 90) e.g, 45
     */
    //% block="set head pan(horizontal)|angle %angle| degrees"
    //% angle.min=-90, angle.max=90
    //% angle.fieldOptions.precision=1
    export function SetHeadPan(angle: number): void {
        let toSend: string = ("hspa " + angle.toString() + "\n");
        serial.writeString(toSend);
    }

   	/**
     * Control Cue's tilt (vertical direction)
     * @param angle vertical angle in degrees (-45 to 45) e.g, 30
     */
    //% block="set head tilt(vertical)|angle %angle| degrees"
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
    //% block="set head|pan_angle %panAngle|degrees tilt_angle %tiltAngle|degrees"
    //% panAngle.min=-90, panAngle.max=90
    //% panAngle.fieldOptions.precision=1
    //% tiltAngle.min=-45, tiltAngle.max=45
    //% tiltAngle.fieldOptions.precision=1
    export function SetHeadPanAndTilt(panAngle: number, tiltAngle: number): void {
        let toSend: string = ("hspta " + panAngle.toString() + " " + tiltAngle.toString() + "\n");
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

          let timeSec :number = time * 1000 // Converting to milliseconds
            let toSend: string = ("bdp " + x.toString() + " " + y.toString() + " " + degrees.toString() + " " + time.toString() + "\n");
            serial.writeString(toSend);
            basic.pause(timeSec)


    }

}
