export class TextBuffer {
	"use strict";

	#private;

	constructor(init) {
		this.#private = {
			property: { type: ["text/javascript"] },
			buffer: {
				caret: Number(),
				string: [String(), String(), String()], // solid, original, workbench
				table: Array(),
				keyword: Array(),
				/*
					["function", "class", "this"]
				*/
				frequent: Array(),
				/*
					{
						from:			number
						by:				u16
						source:			u8
						lncount:		u8	total: 8 bytes
					},
					{
						sameAs:			index
					}
				*/
				history: Array(),
				/*
					{
						operation:	u8
					}
				*/
				accessing: Boolean(),
				push() {}, 		// push to original, add history index, flush workbench (use frequently)	
				optimize() {}	// push to solid, flush original (use at interval)
			},
			out: init.out,
		};
	}

	setDataByStream(readableStreams) {}
	setPipeline(init) {
		/*
			renderAs: "html", "plain"
		*/
	}
	registerModule(init) {}
	/*

	SelfRefactor.prototype.configuration = {
		chunkSize: {
			height: 50
			width: 100
		},
		language: "text/javascript",
	}

	*/

	set configuration(init) {}

	set text(string: string) {

		this.#private.buffer.string[2] = string;
	}

	get text() {
		return this.#private.buffer.string;
	}

	get blob() {
		return 
	}

	get textAsStream() {
		return new ReadableStream({

		})
	}

	get nextChunk() {
		return
	}

	get nextLine() {
		return
	}


	get prevChunk() {
		return
	}

	get prevLine() {
		return
	}


	getLine(init) {}

	getSelection(init) {} // init.search = "Lorem"
	// recieveChunk(string) {
	// }

	input(block) { return }

	/*

	move({
		step: 4,
		ctrl: false
	})

	*/


	up(step) {}

	down(step) {}

	forward(step) {}

	back(step) {}

	moveCaret(init) {
		switch(init.direction.toLowerCase()) {
			case "right":
				break;
			case "left":
				break;
			case "down":
				break;
			default:
		}
	}

	push(string: string) {
		this.#private.buffer.string[2] += string;
	}

	undo(step: number) { for(let i = 0; i < step; i++) {} }

	redo(step: number) {}

};