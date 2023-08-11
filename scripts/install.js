const { execSync } = require("child_process");
const { platform } = require("os");

execSync(`${
	((platform) => {
		switch(platform) {
			case "win32":	return ""
			default:		return `
				sudo cp ./build/arave /usr/local/bin/arave;
				echo "" > $HOME/.arave/arave.config.js;
			`
		}
	})(platform())
}`.replace(/\n|\t/g, ""))