const { execSync } = require("child_process");
const { platform } = require("os");

execSync(`${
	((platform) => {
		switch(platform) {
			case "win32": return ""
			default: return "sudo cp ./build/bin/arave /usr/local/bin/arave"
		}
	})(platform())
}`.replace(/\n|\t/g, ""))