"use strict";

import { ARAVE } from "./arave/lib.js"

import { stdin, stdout, exit } from "node:process"
import tty from "node:tty"
import { format } from "node:util"

if(!stdout.isTTY && (!!tty) && (!!process)) {
	exit(0)
}

stdin.setRawMode(true);
stdin.setEncoding('utf8');
stdout.write(format(ARAVE.term.showAlternate + ARAVE.term.clear + ARAVE.term.cursor.moveTo(0,0) + ARAVE.term.enableBeamCursor));
// ARAVE.setup.readcfg();

stdin.on('data', key => {

	switch(key) {
		case "\x03":
			stdout.write(format(ARAVE.term.hideAlternate + ARAVE.term.disableBeamCursor));
			exit(0);
		case "\r":
			stdout.write(format(ARAVE.term.clear));
			break;
		case "\x7F":
			// this is a backspace
			break;

		default: 
			stdout.write(key);
	}

});