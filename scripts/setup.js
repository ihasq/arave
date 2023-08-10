const { execSync } = require("node:child_process");
const { platform } = require("node:os");

const query = {
	div: (platform() === "win32")? "&& ^" : ";",
	extractor: (platform() === "win32")? "tar -xf" : "unzip",
	remover: (platform() === "win32")? "del" : "rm"
};

execSync(`
	curl -L -O https://github.com/ihasq/arave/archive/refs/heads/main.zip ${query.div}
	${query.extractor} main.zip ${query.div}
	${query.remover} main.zip ${query.div}
	rename arave-main arave ${query.div}
	cd arave ${query.div}
	node ./scripts/build ${query.div}
	cd ../
`.replace(/\n|\t/g, ""));