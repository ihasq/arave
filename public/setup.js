const { execSync } = require("node:child_process");
const { platform } = require("node:os");

const query = {
	isWin: (platform() === "win32"),
	div: this.isWin? "&& ^" : ";",
	extractor: this.isWin? "tar -xf" : "unzip",
	remover: this.isWin? "del" : "rm",
	renameFile: this.isWin? "" : "arave-main.zip",
	rename: this.isWin? "rename arave-main arave" : "mv arave-main.zip arave.zip"
};

execSync(`
	curl -L -O https://github.com/ihasq/arave/archive/refs/heads/main.zip ${query.div}
	${query.extractor} main.zip ${query.div}
	${query.remover} main.zip ${query.div}
	${query.rename} ${query.div}
	cd arave ${query.div}
	node ./scripts/build ${query.div}
	cd ../
`.replace(/\n|\t/g, ""));