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
	RIGHT
}

enum WheelDirections
{
	FRONT_LEFT_WHEEL,
	FRON_RIGHT_WHEEL,
	REAR_WHEEL
}


//% weight=100 color=#0fbc11 icon=""
//% advanced=true
namespace CueAdvanced {

	export interface dictionary {
		[id : string] : () => void
	}
	// let events : dictionary = {};

	//let events : Object = Object.create(null);

	let dummy : () => void =
		function Dummy() : void {
			// do nothing
		}


	let events : Array<()=>void> = [dummy, dummy, dummy, dummy]
		let event_keys : Array<string> = ["bs","bs","bs","bs"]
		let num_events : number = 0
		let MAX_NUM_EVENTS : number = 4

		let event_DELIM : string = "*"

		let parser : () => void =
		function Parser() : void {

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
	export function OnCueSpinning(direction: Directions, body: () => void) : void {
		let directionList : string[] = ["l","r"];
		let func_id : string = "spn" + directionList[button]

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
		let directionList : string[] = ["l","r"];
		let func_id : string = "tlt" + directionList[button]

			// register interrupt with router
			let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}

	/**
	 * Check if Cue detects an object is detected in front of Cue
	 * @param component
	 */
	//% block="On object detected |wheelDirection %wheelDirection|"
	export function OnCueObjectDetected(wheelDirection: WheelDirections, body: () => void) : void {
		let wheelDirList : string[] = ["fl","fr", "r"];
		let func_id : string = "tlt" + wheelDirList[wheelDirection]

			// register interrupt with router
			let toSend : string = "Interrupt " + func_id + "\n"
			serial.writeString(toSend);

		// queue event in this script's parser
		let success : boolean = queue_event(event_DELIM + func_id, body)

			serial.onDataReceived(event_DELIM, parser)
	}




}
