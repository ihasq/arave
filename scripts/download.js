const { execSync } = require("node:child_process");
const { platform } = require("node:os");

const div = (platform() === "win32")? "&& ^" : ";"

execSync(`
	echo "Downloading fresh source code zip file..." ${div}
	curl -L -O https://github.com/ihasq/arave/archive/refs/heads/main.zip ${div}
	echo "Extracting zip file..." ${div}
	${(platform() === "win32")? "tar -xf" : "unzip"} main.zip ${div}
	${(platform() === "win32")? "del" : "rm"} main.zip ${div}
	cd arave-main ${div}
	node ./scripts/build
`.replace(/\n|\t/g, ""));