"use strict";

import { ARAVE } from "./arave/lib.js"

import process from "process"
import tty from "tty"

setTimeout(main, 0);

function main() {

	if(!process.stdout.isTTY && (!!tty) && (!!process)) {
		process.exit(0)
	}
	const test = new ARAVE.TextBuffer({
		out: process.stdout
	})
	
	let output = "";
	process.stdin.setRawMode(true);
	process.stdin.setEncoding('utf8');
	process.stdout.write(ARAVE.term.showAlternate);
	process.stdout.write(ARAVE.term.enableBeamCursor);
	process.stdout.write(ARAVE.term.clear);
	process.stdout.write(ARAVE.term.cursor.reset);

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
}