const { execSync } = require("node:child_process");
const { writeFileSync } = require("fs")
const { platform } = require("node:os");

const isWin = (platform() === "win32");

const query = {
	file: isWin? "bat" : "sh",
	div: isWin? "&& ^" : ";",
	extractor: isWin? "tar -xf" : "unzip",
	remover: isWin? "del" : "rm",
	rename: isWin? "rename" : "mv"
};

writeFileSync(`setup.${query.file}`, `
	curl -L -O https://github.com/ihasq/arave/archive/refs/heads/main.zip ${query.div}
	${query.extractor} main.zip ${query.div}
	${query.remover} main.zip ${query.div}
	${query.rename} arave-main arave ${query.div}
	cd arave ${query.div}
	node ./scripts/build ${query.div}
	cd ../
`.replace(/\n|\t/g, ""))