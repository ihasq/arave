// import settings from "../../../arave.config.js"

export const term = {
	showAlternate: "\x1b[?1049h",
	hideAlternate: "\x1b[?1049l",
	enableBeamCursor: "\x1b[6 q",
	disableBeamCursor: "\x1b[0 q",
	clear: "\x1b[2J",
	cursor: {
		moveTo: (line, column) => `\x1b[${line};${column}H`,
	},
	report: "\x1b[0c"
}