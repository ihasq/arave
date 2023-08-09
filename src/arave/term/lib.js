import settings from "../../../arave.config.js"

export const term = {
	showAlternate: Buffer.from("\x1b[?1049h"),
	hideAlternate: Buffer.from("\x1b[?1049l"),
	enableBeamCursor: Buffer.from(`\x1b[${settings.editor.cursor.type} q`),
	disableBeamCursor: Buffer.from("\x1b[0 q"),
	getLocator: Buffer.from([0x1b, 0x5b, ]),
	clear: Buffer.from("\x1b[2"),
	clearAndRepos: Buffer.from([0x1b, 0x5b, 0x32, 0x4a, 0x1b, 0x5b, 0x30, 0x3b, 0x30, 0x48]),
	cursor: {
		reset: Buffer.from([0x1b, 0x5b, 0x30, 0x3b, 0x30, 0x48]),
	}
}