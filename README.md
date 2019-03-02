# Setup Guide for the Cue-Micro:bit Experience

1.	Go to the official Micro:bit Makecode website.
https://makecode.microbit.org/
2.	Create a new project.

3.	Click on the Advanced module, and then click on Extensions.

4.	Enter the project URL to get the Cue extension.

https://github.com/vbett01/pxt-cue

5.	Click on cue. This will add the Cue extension.

6.	Create custom program using the Cue extension.

7.	Download the .hex file for the program.

8.	Download router.py from the router directory located in the Cue repository.

https://github.com/vbett01/pxt-cue

9.	Run router.py from the terminal. (This script connects the host machine to Cue to create a communication channel between the Cue and the Micro:bit)

10.	 Upload the .hex file to the Micro:bit. (Micro:bit should be connected to the same host machine that is running router.py)

11.	 The program should be working once the .hex file is fully uploaded. 

12.	 To restart the program, simply reset the Micro:bit. To implement a different program, download the relevant .hex file and upload it to the Micro:bit. 

13.	 router.py, once running, does not need to be terminated if a new program is being implemented. Quit router.py only when no more programs are being implemented.
