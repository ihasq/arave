import esbuild from 'esbuild';

await esbuild.build({
	bundle: true,
	minify: true,
	entryPoints: ['./src/app.js'],
	outdir: './build/js',
	format: "cjs",
	platform: "node",
})