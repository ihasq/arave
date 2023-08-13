const { execSync } = require("node:child_process");
const { platform, arch } = require("node:os");
// const rcedit = require("rcedit")

execSync(`
	npm update
	npx esbuild ./src/index.js --bundle --outfile=build/arave.js --platform=node --log-level=silent
	npx pkg . --target node18-${
		(platform => {
			switch(platform) {
				case "darwin":	return "macos";
				case "win32":	return "win";
				default:		return platform;
			}
		})(platform())
	}-${
		(arch => {
			switch(arch) {
				case "x64":		return arch;
				case "arm64":	return arch;
				default:		return;
			}
		})(arch())
	}
`.replace(/\t/g, ""))