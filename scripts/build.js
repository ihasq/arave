const { execSync } = require("child_process");
const { platform, arch } = require("os");
// const rcedit = require("rcedit")

execSync(`
	npx esbuild ./src/index.ts --bundle --minify --outfile=build/arave.js --platform=node --log-level=silent ${(platform() === "win32")? "&& ^" : ";"}
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
`.replace(/\n|\t/g, ""))