"use strict";

import { ARAVE } from "./arave/lib.js"

import process from "node:process"
import tty from "node:tty"
import { format } from "node:util"

if(!process.stdout.isTTY && (!!tty) && (!!process)) {
	process.exit(0)
}

process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdout.write(format(ARAVE.term.showAlternate + ARAVE.term.clear + ARAVE.term.cursor.moveTo(0,0) + ARAVE.term.enableBeamCursor));
// ARAVE.setup.readcfg();

process.stdin.on('data', key => {

	switch(key) {
		case "\x03":
			console.log('Exit process');

			process.stdout.write(format(ARAVE.term.hideAlternate + ARAVE.term.disableBeamCursor));

			process.exit(0);

		case "\r":
			process.stdout.write(format(ARAVE.term.clear));

		// backspace
		case "\x7F":
			break;

		default: 
			process.stdout.write(key);
	}

});