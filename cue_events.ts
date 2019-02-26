enum Buttons
{
	MAIN_BUTTON,
	HEAD_LEFT,
	HEAD_RIGHT,
	HEAD_BACK
}

enum Directions
{
	LEFT,
	RIGHT,
	FRONT,
	BACK
}
enum SpinDirections
{
	LEFT,
	RIGHT
}

enum WheelDirections
{
	FRONT,
	REAR
}

enum X_Directions
{
	LEFT,
	RIGHT,
	FORWARD
}

enum Y_Directions
{
	UP,
	DOWN,
	LEVEL
}


//% weight=100 color=#0fbc11 icon=""
namespace CueEvents {

	export interface dictionary {
		[id : string] : () => void
	}
	// let events : dictionary = {};

	//let events : Object = Object.create(null);

	let dummy : () => void =
		function Dummy() : void {
			// do nothing
		}


	let events : Array<()=>void> = [dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy, dummy]
		// Btw bs stands for Bhushan Suwal - One of our lovely developers! (◡‿◡✿)
		let event_keys : Array<string> = ["bs","bs","bs","bs", "bs", "bs", "bs", "bs","bs","bs","bs", "bs", "bs", "bs", "bs","bs","bs","bs", "bs", "bs", "bs"]
		let num_events : number = 0
		let MAX_NUM_EVENTS : number = 21

		let event_DELIM : string = "*"

		let parser : () => void =
		function Parser() : void {

			basic.pause(200)
			let func_id : string = serial.readUntil("|")
				// Run the function if it exists
				for (let i :number = 0; i < num_events; i++) {
					// let checking_fn : string = "checking " + func_id +
					// 							" with " + event_keys[i] +
					// 							 "\n"
					// serial.writeString(checking_fn)
					if (func_id == event_keys[i]) {
						// let calling_fn : string = "sending " + func_id + "\n"
						// serial.writeString(calling_fn)
						events[i]()
					}
				}
		};

	export function queue_event(func_id : string, body : () => void): boolean {
		if (num_events >= MAX_NUM_EVENTS) {
			return false
		}
		events[num_events] = body
			event_keys[num_events] = func_id
			num_events = num_events + 1
			return true
	}


	/**
	 * Check if Cue button is pressed
	 * @param component
	 */
	//% block="On| button %button| pressed"
	export function OnButtonPressed(button: Buttons, body: () => void) : void {
		let buttonList : string[] = ["m","1", "2", "3"];
		let func_id : string = "btn" + buttonList[button]

			// register interrupt with router


			let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}


	/**
	 * Check if Cue sound is playing
	 * @param component
	 */
	//% block="On sound playing"
	export function OnSoundPlaying(body: () => void) : void {
		let func_id : string = "spk";

		// register interrupt with router
		let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}

	/**
	 * Check if Cue animation is playing
	 * @param component
	 */
	//% block="On Cue animation playing"
	export function OnAnimationPlaying(body: () => void) : void {
		let func_id : string = "ani"

			// register interrupt with router
			let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}


	/**
	 * Check if Cue is spinning
	 * @param component
	 */
	//% block="On cue spinning | direction %direction|"
	export function OnCueSpinning(direction: SpinDirections, body: () => void) : void {
		let directionList : string[] = ["l","r"];
		let func_id : string = "gyrz" + directionList[direction]

			// register interrupt with router
			let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}

	/**
	 * Check if Cue is tilted
	 * @param component
	 */
	//% block="On cue tilted | direction %direction|"
	export function OnCueTilted(direction: Directions, body: () => void) : void {
		let directionList : string[] = ["l","r", "f", "b"];
		let func_id : string = "tlt" + directionList[direction]

			// register interrupt with router
			let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}

	/**
	 * Check if Cue detects an object that is within 20 cm from either the front or the back
	 * @param component
	 */
	//% block="On object detected |near %wheelDirection|"
	export function OnCueObjectDetected(wheelDirection: WheelDirections, body: () => void) : void {
		let wheelDirList : string[] = ["f", "r"];
		let func_id : string = "objd" + wheelDirList[wheelDirection]

			// register interrupt with router
			let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}

	/**
	 * Check the orientation of Cue's Head
	 * @param component
	 */
	//% block="On head facing |%x_dir| and  |%y_dir|"
	export function OnCueHeadFacing(x_dir: X_Directions, y_dir: Y_Directions, body: () => void) : void {

		let xDirList : string[] = ["l","r", "f"];
		let yDirList : string[] = ["u","d","v"];
		let func_id : string = "hfd" + xDirList[x_dir] + yDirList[y_dir]

			// register interrupt with router
			let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}



}
