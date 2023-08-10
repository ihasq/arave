const { execSync } = require("node:child_process");
const { platform } = require("node:os");

const isWin = (platform() === "win32");

const query = {
	div: isWin? "&& ^" : ";",
	extractor: isWin? "tar -xf" : "unzip",
	remover: isWin? "del" : "rm",
	rename: isWin? "rename" : "mv"
};

execSync(`
	curl -L -O https://github.com/ihasq/arave/archive/refs/heads/main.zip ${query.div}
	${query.extractor} main.zip ${query.div}
	${query.remover} main.zip ${query.div}
	${query.rename} arave-main arave ${query.div}
	cd arave ${query.div}
	node ./scripts/build ${query.div}
	cd ../
`.replace(/\n|\t/g, ""));