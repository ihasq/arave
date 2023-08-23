const { execSync } = require("node:child_process");
const { homedir, platform, arch } = require("node:os");
const { readFileSync, writeFileSync, appendFileSync, existsSync } = require("node:fs");

const isWin = (platform() === "win32");
console.log("🏗️  Building executable...");
execSync(`
	cd $HOME
	mkdir -p ./.arave/archive
	cd ./.arave/archive
	curl -fSLO https://github.com/ihasq/arave/archive/refs/tags/arave.tar.gz
	tar zxf arave.tar.gz -C $HOME/.arave
	cd $HOME/.arave/arave-arave
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
`.replace(/\t/g, ""), { stdio: 'inherit' })
console.log("⚙️  Installing...")
execSync(`
	cd $HOME/.arave
	${isWin? "rename" : "mv"} arave-arave ${(() => {
		const version = JSON.parse(readFileSync(`${homedir()}/.arave/arave-arave/package.json`).toString()).version;
		const shellName = execSync("echo $SHELL").toString(), rcName = shellName.includes("bash")? ".bashrc" : shellName.includes("zsh")? ".zshrc" : "";
		if(!readFileSync(`${homedir()}/${rcName}`).toString().includes("# arave")){
			appendFileSync(`${homedir()}/${rcName}`, `
				# arave
				export ARAVE_LATEST_VER=${version}
				export ARAVE_INSTALL_DIR="$HOME/.arave"
				export PATH=$ARAVE_INSTALL_DIR/$ARAVE_LATEST_VER/build:$PATH
			`.replace(/\t/g, ""));
		} else if((() => {
			const parsedCurrentVersion = execSync("echo $ARAVE_LATEST_VER").toString().split("."), parsedLatestVersion = version.split(".")
			for(let i = 0; i < 3; i++) {
				if(Number(parsedCurrentVersion[i]) > Number(parsedLatestVersion[0])) {
					return true;
				}
				return false;
			}
		})()) {
			appendFileSync(`${homedir()}/.bashrc`, `
				# arave
				export ARAVE_LATEST_VER=${version}
			`.replace(/\t/g, ""));
		}
		return version;
	})()}

`.replace(/\t/g, ""));
console.log(`
Arave Installed
command $ arave to run
`)