const { execSync } = require("node:child_process");
const { writeFileSync } = require("node:fs")
const { platform } = require("node:os");

const isWin = (platform() === "win32");

execSync(`
	curl -LO https://github.com/ihasq/arave/archive/refs/heads/main.zip
	echo 🔧 Extracting zip...
	${isWin? "tar -xf" : "unzip"} main.zip
	${isWin? "del" : "rm"} main.zip
	${isWin? "rename" : "mv"} arave-main arave
	cd arave
	npm run build
	npm run install
	cd ../
`.replace(/\t/g, ""), { stdio: 'inherit' })