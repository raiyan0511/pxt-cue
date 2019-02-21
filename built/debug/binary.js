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
    r0 = pxsim.pxtrt.mkMap();
    s.tmp_0 = r0;
    r0 = globals.events___357;
    r0 = s.tmp_0;
    globals.events___357 = (r0);
    r0 = Parser__P360;
    s.tmp_0 = r0;
    r0 = globals.parser___359;
    r0 = s.tmp_0;
    globals.parser___359 = (r0);
    return leave(s, r0)
  default: oops()
} } }
_main___P1.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"cue_interrupts.ts","functionName":"<main>"}
_main___P1.continuations = [  ]



var Parser__P360  = function (s) {
var r0 = s.r0, step = s.pc;
s.pc = -1;
while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.func_id___361 = undefined;
    r0 = pxsim.serial.readUntil("|");
    s.tmp_0 = r0;
    r0 = s.func_id___361;
    r0 = s.tmp_0;
    s.func_id___361 = (r0);
    r0 = s.func_id___361;
    return leave(s, r0)
  default: oops()
} } }
Parser__P360.info = {"start":352,"length":206,"line":20,"column":2,"endLine":30,"endColumn":3,"fileName":"cue_advanced.ts","functionName":"Parser"}


setupDebugger(1)
