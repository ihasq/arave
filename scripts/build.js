const { execSync } = require("child_process");
const { platform, arch } = require("os");

execSync(`
	npx esbuild ./src/main.js --bundle --minify --outdir=./build/js --define:RELEASE=true --platform=node;
	npx pkg . --target node18-${
		(platform => {
			switch(platform) {
				case "darwin": return "macos";
				case "win32": return "win";
				default: return platform;
			}
		})(platform())
	}-${
		(arch => {
			switch(arch) {
				case "x64": return arch;
				case "arm64": return arch;
				default: return;
			}
		})(arch())
	}
`.replace(/\n|\t/g, ""));