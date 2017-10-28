import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/browser.js',
  output: {
    file: 'dist/browser.js',
    format: 'umd',
    name: 'cookie',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
};
