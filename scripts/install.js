const { execSync } = require("node:child_process");
const { homedir, platform } = require("node:os");
const { appendFileSync } = require("node:fs");

execSync(`${
	((platform) => {
		switch(platform) {
			case "win32":	return ""
			default:		return `
				cp ./build/arave ~/.arave/bin/arave ;
				echo "" > $HOME/.arave/arave.config.js ;
			`
		}
	})(platform())
}`.replace(/\n|\t/g, ""));

switch(platform()) {
	case "win32":
		break;
	default:
		try {
			execSync("grep -q \"# arave\" ~/.bashrc")
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