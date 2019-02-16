'use strict';
pxsim.noRefCounting();
pxsim.setTitle("cue");
pxsim.setConfigData({}, {});


var _main___P1 = entryPoint = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    r0 = pxsim.serial.redirect(1001, 1002, 115200);
    return leave(s, r0)
  default: oops()
} } }
_main___P1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"cue_interrupts.ts","functionName":"<main>"}
_main___P1.continuations = [  ]


setupDebugger(1)
