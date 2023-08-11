"use strict";

import { ARAVE } from "./arave/lib.js"

import process from "node:process"
import tty from "node:tty"

if(!process.stdout.isTTY && (!!tty) && (!!process)) {
	process.exit(0)
}
const test = new ARAVE.TextBuffer({
	out: process.stdout
})

process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdout.write(ARAVE.term.showAlternate);
process.stdout.write(ARAVE.term.enableBeamCursor);
process.stdout.write(ARAVE.term.clear);
process.stdout.write(ARAVE.term.cursor.reset);
// ARAVE.setup.readcfg();

process.stdin.on('data', key => {

	switch(key) {
		case "\x03":
			console.log('Exit process');

			process.stdout.write(ARAVE.term.hideAlternate);
			process.stdout.write(ARAVE.term.disableBeamCursor);

			process.exit(0);

		case "\r":
			process.stdout.write(ARAVE.term.clearAndRepos);

		// backspace
		case "\x7F":
			break;

		default: 
			process.stdout.write(key);
	}

});