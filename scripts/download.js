const { execSync } = require("node:child_process");
const { platform } = require("node:os");

const cmddiv = (platform() === "windows")? "&& ^" : ";"

execSync(`
	curl -L -O https://github.com/ihasq/arave/archive/refs/heads/main.zip ${cmddiv}
	${(platform() === "windows")? "tar -xf" : "unzip"} main.zip ${cmddiv}
	${(platform() === "windows")? "del" : "rm"} main.zip ${cmddiv}
	cd arave-main
`.replace(/\n|\t/g, ""));