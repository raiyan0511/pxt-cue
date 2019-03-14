# Setup Guide for the Cue-Micro:bit Experience
1. Connect the Micro:bit to your USB port

2. Turn on Cue

## Cue
3.	Download the **router** directory located in the Cue repository.

4. In a new [python virtual environment](https://docs.python-guide.org/dev/virtualenvs/) run ``` pip2 install -r requirements.txt```

5.	Run ```python2 router.py``` from the terminal. (This script connects the host machine to Cue to create a communication channel between the Cue and the Micro:bit)
  *router.py, once running, does not need to be terminated if a new program is being implemented. Quit router.py only when no    more programs are being implemented.*

## Micro:bit

6.	Go to the official Micro:bit Makecode website.
              https://makecode.microbit.org/
7.	Create a new project.

8.	Click on the **Advanced** module, and then click on **Extensions.**

9.	Enter the project URL to get the Cue extension.

              https://github.com/vbett01/pxt-cue

10.	Click on **Cue**. This will add the Cue extension.

11.	Create custom program using the Cue extension.

12.	Download the .hex file for the program.

13.	 Upload the .hex file to the Micro:bit. (Micro:bit should be connected to the same host machine that is running router.py)
  	 *The program should be working once the .hex file is fully uploaded.* 

14.	 To restart the program, simply reset the Micro:bit. To implement a different program, download the relevant .hex file and upload it to the Micro:bit. 


