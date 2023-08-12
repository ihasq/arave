const { writeFileSync } = require("node:fs")
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
	echo 📦 Downloading fresh source code... ${query.div}
	curl -LO https://github.com/ihasq/arave/archive/refs/heads/main.zip ${query.div}
	echo 🔧 Extracting zip... ${query.div}
	${query.extractor} main.zip ${query.div}
	${query.remover} main.zip ${query.div}
	${query.rename} arave-main arave ${query.div}
	cd arave ${query.div}
	echo 🏗️ Building executable... ${query.div}
	npm run build ${query.div}
	npm run install ${query.div}
	cd ../
`.replace(/\n|\t/g, ""))