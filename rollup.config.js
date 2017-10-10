export default {
	entry: 'src/index.js',
	indent: '\t',
	// sourceMap: true,
	targets: [
		{
			format: 'umd',
			moduleName: 'GLMath',
			dest: 'dist/gl-math.js'
		},
		{
			format: 'es',
			dest: 'dist/gl-math.module.js'
		}
	]
};
