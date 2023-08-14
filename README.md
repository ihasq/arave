# Arave - Text Editor (work in progress)

## Installation

### Build from scripts
#### Requirements
+ Git
+ Node.js ^16.15.0
+ npm with npx

Good news! you can automatically download, extract, and build Arave by running this command in your shell.
```
curl -fsSL https://github.com/ihasq/arave/raw/main/releases/setup.js | node
```

or you can follow these steps manually to build same application:
#### 1\. Get Source Code
Download source code with ```curl```, then extract zip file.\
on UNIX:
```
curl -LO https://github.com/ihasq/arave/archive/refs/heads/main.zip
unzip main.zip
cd arave-main
```
on Windows:
```
curl -L -O https://github.com/ihasq/arave/archive/refs/heads/main.zip
tar -xf main.zip
cd arave-main
```

#### 2\. Build
Run build script. then the executable will be placed in ```./build/arave(.exe)```
```
npm run build
```

#### 3\. Install
Run installation script. no root required.
```
npm run install
```

#### 4\. Run
Run Arave at anywhere
```
$ arave
```

### Download Pre-built
Work In Progress

## Credits
Thanks to all brilliant developers, who maintains these great open-source projects:
[nodejs/node](https://github.com/nodejs/node#readme)&nbsp;&nbsp;|&nbsp;&nbsp;[npm/cli](https://github.com/npm/cli#readme)&nbsp;&nbsp;|&nbsp;&nbsp;[vercel/pkg](https://github.com/vercel/pkg#readme)&nbsp;&nbsp;|&nbsp;&nbsp;[evanw/esbuild](https://github.com/evanw/esbuild#readme)&nbsp;&nbsp;|&nbsp;&nbsp;[electron/node-rcedit](https://github.com/electron/node-rcedit#readme)

## License
This project is maintained under the MIT License
