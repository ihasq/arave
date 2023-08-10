const { execSync } = require("node:child_process");
const { platform } = require("node:os");

const cmddiv = (platform() === "win32")? "&& ^" : ";"

execSync(`
	curl -L -O https://github.com/ihasq/arave/archive/refs/heads/main.zip ${cmddiv}
	${(platform() === "win32")? "tar -xf" : "unzip"} main.zip ${cmddiv}
	${(platform() === "win32")? "del" : "rm"} main.zip ${cmddiv}
	cd arave-main ${cmddiv}
	node ./scripts/build ${cmddiv}
`.replace(/\n|\t/g, ""));