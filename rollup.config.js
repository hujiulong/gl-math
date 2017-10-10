export default {
	entry: 'src/index.js',
	indent: '\t',
	// sourceMap: true,
	targets: [
		{
			format: 'umd',
			moduleName: 'GLMath',
			dest: 'build/gl-math.js'
		},
		{
			format: 'es',
			dest: 'build/gl-math.module.js'
		}
	]
};
