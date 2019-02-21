enum Buttons
{
		MAIN_BUTTON,
    HEAD_LEFT,
    HEAD_RIGHT,
    HEAD_BACK
}


//% weight=100 color=#0fbc11 icon=""
//% advanced=true
namespace CueAdvanced {

	// export interface dictionary {
	// 	[id : string] : () => void;
	// }


 //	let eventKeys : string[] = ["bn"] ///: { [func_id : string] : Action } = {};
	let event_DELIM : string = "*";
	let parser : () => void =
		function Parser() {

			let func_id : string = serial.readUntil("|")

			// Run the function if it exists
			// if (func_id in events) {
				// events[func_id];
				// eval(events[func_id]);
				events[func_id];
			// }
		};


	// let DELIM : string = "*";
	//
  //   /**
  //    * Read Acceleration data in cm/s^2
  //    * @param component
  //    */
  //   //% block="on acceleration data"
  //   export function OnAcceleration(body: () => void) : void {
  //       // ears front, ears left, ears right, front, top, all
	// 			let toSend : string = "OnAcceleration\n"
	// 			let after : string = "After\n"
	// 			serial.writeString(toSend);
  //       let component_list: string[] = ["m", "x", "y", "z"];
	// 		 serial.onDataReceived(DELIM, body)
	// 		// serial.writeString(after)
  //   }

		/**
     * Check if Cue button is pressed
     * @param component
     */
    //% block="On| button main| pressed"
    export function OnButtonPressed( body: () => void) : void {

        let buttonList : string[] = ["m","1", "2", "3"];
				//let toSend : string = "Interrupt btn" + buttonList[button] + "\n"

				events["btnm"] = body

				serial.onDataReceived(event_DELIM, parser)
    }





		/**
		 * Check if Cue sound is playing
		 * @param component
		 */
		//% block="On Sound Playing"
		export function OnSoundPlaying(body: () => void) : void {
				let onSoundPlaying_DELIM : string = "*";

				let toSend : string = "Interrupt spk\n"
				serial.writeString(toSend);
				serial.onDataReceived(onSoundPlaying_DELIM, body)
			// serial.writeString(after)
		}
		/**
     * Check if Cue animation is on
     * @param component
     */
    //% block="On Face Animation Playing"
    export function OnAnimationPlaying(body: () => void) : void {
				let onAnimationPlaying_DELIM : string = "@";

				let toSend : string = "Interrupt ani\n"
				serial.writeString(toSend);
			 	serial.onDataReceived(onAnimationPlaying_DELIM, body)
			// serial.writeString(after)
    }





}
