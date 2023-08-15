import { format } from "node:util"
import { stdout } from "node:process"

const fmtCache = Object.create(null)

export function fmtout(arg) {
	if(!fmtCache[arg]) {
		fmtCache[arg] = format(arg)
	};
	stdout.write(fmtCache[arg])
}