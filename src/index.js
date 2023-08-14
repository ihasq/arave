"use strict";

import { ARAVE } from "./lib"
import process from "node:process"
import util from "node:util"
import { PieceTreeTextBufferBuilder, DefaultEndOfLine } from "@vscode/textbuffer/src/index"

global.AraveRuntime = new ARAVE.Runtime();

import tty from "node:tty"

if(!process.stdout.isTTY) {
	exit(0)
}


process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdout.write(util.format(ARAVE.term.showAlternate + ARAVE.term.clear + ARAVE.term.cursor.moveTo(0, 0) + ARAVE.term.enableBeamCursor));

const pieceTreeTextBufferBuilder = new PieceTreeTextBufferBuilder();
pieceTreeTextBufferBuilder.acceptChunk('abc\n');
pieceTreeTextBufferBuilder.acceptChunk('def');
const pieceTreeFactory = pieceTreeTextBufferBuilder.finish(true);
const pieceTree = pieceTreeFactory.create(DefaultEndOfLine.LF);

pieceTree.getLineCount(); // 2
process.stdout.write(pieceTree.getLineContent(1) + "\n"); // 'abc'
process.stdout.write(pieceTree.getLineContent(2)); // 'def'

process.on("SIGWINCH", () => {
	ARAVE.property.term.size.width = process.stdout.columns;
	ARAVE.property.term.size.column = process.stdout.lines;
} )
// arave.setup.readcfg();

const keyFn = {
	"\x03"() {
		process.stdout.write(util.format(ARAVE.term.hideAlternate + ARAVE.term.disableBeamCursor));
		process.exit(0);
	},
	"\r"() {
		process.stdout.write(util.format(ARAVE.term.clear + ARAVE.term.cursor.moveTo(0, 0)));
	},
	"\x7F"() {}
}

process.stdin.on('data', key => {
	ARAVE.editor.resolve(key)
	if(!keyFn[key]) {
		process.stdout.write(key);
	} else {
		keyFn[key]();
	};
});