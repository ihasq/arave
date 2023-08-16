import { format } from "node:util"
import { stdout } from "node:process"

const fmtCache = Object.create(null)

export function fmtout(...arg) {
	for(let i = 0; i < arg.length; i++) {
		if(!fmtCache[arg[i]]) {
			fmtCache[arg[i]] = format(arg[i])
		}
		stdout.write(fmtCache[arg[i]])
	}
}