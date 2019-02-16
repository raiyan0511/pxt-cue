# Readme File

### Make sure directory is in pxt-microbit/libs/
	along with core, radio, bluetooth etc.

### To set this up
1. In **pxt-microbit/pxtarget.json** (check id to make sure its microbit): 
	* add *"libs/cue"* to the **bundledirs** dictionary(lines 8 to 15)
	* add *"cue" : "cue"* to **compile.patches.map** (lines 45 to 55)
2. In Interface/FileExplorer, find **pxt.json in the same directory as main.ts** (or alternatively find the project folder in pxt-microbit/projects and edit the pxt.json file inside): 
	* add *"cue":"\*"* in the **dependencies** dictionary