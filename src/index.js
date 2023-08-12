"use strict";

import { arave } from "./arave/lib"
import { std } from "./std/lib"
import { PieceTreeTextBufferBuilder, DefaultEndOfLine } from "@vscode/textbuffer/src/index"

import tty from "node:tty"

if(!std.process.stdout.isTTY) {
	exit(0)
}


std.process.stdin.setRawMode(true);
std.process.stdin.setEncoding('utf8');
std.process.stdout.write(std.util.format(arave.term.showAlternate + arave.term.clear + arave.term.cursor.moveTo(0, 0) + arave.term.enableBeamCursor));

const pieceTreeTextBufferBuilder = new PieceTreeTextBufferBuilder();
pieceTreeTextBufferBuilder.acceptChunk('abc\n');
pieceTreeTextBufferBuilder.acceptChunk('def');
const pieceTreeFactory = pieceTreeTextBufferBuilder.finish(true);
const pieceTree = pieceTreeFactory.create(DefaultEndOfLine.LF);

pieceTree.getLineCount(); // 2
std.process.stdout.write(pieceTree.getLineContent(1) + "\n"); // 'abc'
std.process.stdout.write(pieceTree.getLineContent(2)); // 'def'
// arave.setup.readcfg();

const keyFn = {
	"\x03"() {
		process.stdout.write(std.util.format(arave.term.hideAlternate + arave.term.disableBeamCursor));
		process.exit(0);
	},
	"\r"() {
		process.stdout.write(std.util.format(arave.term.clear + arave.term.cursor.moveTo(0, 0)));
	},
	"\x7F"() {}
}

std.process.stdin.on('data', key => {
	if(!keyFn[key]) {
		std.process.stdout.write(key);
	} else {
		keyFn[key]();
	};
});