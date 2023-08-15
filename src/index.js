"use strict";

import { ARAVE } from "./lib/lib";

import process from "node:process";
import util from "node:util";

import tty from "node:tty"

process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
ARAVE.fmtout(ARAVE.term.showAlternate + ARAVE.term.clear + ARAVE.term.cursor.moveTo(0, 0) + ARAVE.term.enableBeamCursor);

const pieceTreeTextBufferBuilder = new ARAVE.VSCodeTextBuffer.PieceTreeTextBufferBuilder();
pieceTreeTextBufferBuilder.acceptChunk('abc\n');
pieceTreeTextBufferBuilder.acceptChunk('def');
const pieceTreeFactory = pieceTreeTextBufferBuilder.finish(true);
const pieceTree = pieceTreeFactory.create(ARAVE.VSCodeTextBuffer.DefaultEndOfLine.LF);

// pieceTree.getLineCount(); // 2
// process.stdout.write(pieceTree.getLineContent(1) + "\n"); // 'abc'
// process.stdout.write(pieceTree.getLineContent(2)); // 'def'

process.on("SIGWINCH", () => {
	ARAVE.property.term.size.width = process.stdout.columns;
	ARAVE.property.term.size.column = process.stdout.lines;
} )
// arave.setup.readcfg();

const keyFn = {
	"\x03"() {
		ARAVE.fmtout(ARAVE.term.hideAlternate + ARAVE.term.disableBeamCursor);
		process.exit(0);
	},
	"\r"() {
		ARAVE.fmtout(ARAVE.term.clear + ARAVE.term.cursor.moveTo(0, 0));
	},
	"\x7F"() {
		// ARAVE.fmtTest()
	}
}

process.stdin.on('data', key => {
	// ARAVE.editor.resolve(key)
	if(!keyFn[key]) {
		process.stdout.write(key);
	} else {
		keyFn[key]();
	};
});

if(!process.stdout.isTTY) {
	exit(0)
}