const { execSync } = require("child_process");
const { platform } = require("os");

execSync(`${
	((platform) => {
		switch(platform) {
			case "win32":	return ""
			default:		return `
				sudo cp ./build/arave /usr/local/bin/arave;
				mkdir $HOME/.arave;
			`
		}
	})(platform())
}`.replace(/\n|\t/g, ""))