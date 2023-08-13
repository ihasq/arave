const { writeFileSync } = require("node:fs")
const { platform } = require("node:os");

const isWin = (platform() === "win32");

const query = {
	file: isWin? "bat" : "sh",
	extractor: isWin? "tar -xf" : "unzip",
	remover: isWin? "del" : "rm",
	rename: isWin? "rename" : "mv"
};

writeFileSync(`setup.${query.file}`, `
	echo 📦 Downloading fresh source code...
	curl -LO https://github.com/ihasq/arave/archive/refs/heads/main.zip
	echo 🔧 Extracting zip...
	${query.extractor} main.zip
	${query.remover} main.zip
	${query.rename} arave-main arave
	cd arave
	echo 🏗️ Building executable...
	npm run build
	npm run install
	cd ../
`.replace(/\t/g, ""))