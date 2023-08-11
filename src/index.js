"use strict";

import { ARAVE } from "./arave/lib"
import { PieceTreeTextBufferBuilder, DefaultEndOfLine } from "@vscode/textbuffer/src/index"

import { stdin, stdout, exit } from "node:process"
import { format } from "node:util"

import tty from "node:tty"

if(!stdout.isTTY) {
	exit(0)
}

stdin.setRawMode(true);
stdin.setEncoding('utf8');
stdout.write(format(ARAVE.term.showAlternate + ARAVE.term.clear + ARAVE.term.cursor.moveTo(0, 0) + ARAVE.term.enableBeamCursor));
// ARAVE.setup.readcfg();

const keyFn = {
	"\x03"() {
		stdout.write(format(ARAVE.term.hideAlternate + ARAVE.term.disableBeamCursor));
		exit(0);
	},
	"\r"() {
		stdout.write(format(ARAVE.term.clear + ARAVE.term.cursor.moveTo(0, 0)));
	},
	"\x7F"() {}
}

stdin.on('data', key => {
	if(!keyFn[key]) {
		stdout.write(key);
	} else {
		keyFn[key]();
	};
});