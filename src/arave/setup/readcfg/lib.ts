export function readcfg() {
	import("$HOME/.arave/arave.config.mjs").then(settings => console.log(settings))
}