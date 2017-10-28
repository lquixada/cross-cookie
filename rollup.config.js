import path from 'path';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default [{
  input: path.join(__dirname, 'src', 'browser.js'),
  output: {
    file: path.join(__dirname, 'dist', 'browser.min.js'),
    format: 'umd',
    name: 'cookie',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
  ],
}, {
  input: path.join(__dirname, 'src', 'react-native.js'),
  external: ['react-native'],
  output: {
    file: path.join(__dirname, 'dist', 'react-native.min.js'),
    format: 'cjs',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
  ],
}];
