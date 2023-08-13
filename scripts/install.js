const { execSync } = require("node:child_process");
const { homedir, platform } = require("node:os");
const { appendFileSync } = require("node:fs");

switch(platform()) {
	case "win32":
		break;
	default:
		try {
			execSync(`
				cp ./build/arave ~/.arave/bin/arave
				echo "" > $HOME/.arave/arave.config.js
				grep -q \"# arave\" ${(()=>{
					const shellName = execSync("echo $SHELL").toString()
					if(shellName.includes("bash")) {
						return "~/.bashrc"
					} else if(shellName.includes("zsh")) {
						return "~/.zshrc"
					}
				})()} ;
			`.replace(/\t/g, ""));
		} catch(error) {
			if(error.status) {
				appendFileSync(`${homedir()}/.bashrc`, `

					# arave
					export ARAVE_INSTALL="$HOME/.arave"
					export PATH=$ARAVE_INSTALL/bin:$PATH
				`.replace(/\t/g, ""));
			}
		}
}