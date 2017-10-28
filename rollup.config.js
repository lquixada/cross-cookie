import path from 'path';
import uglify from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default [
  // For webpack usage via require() function
  {
    input: path.join(__dirname, 'src', 'browser.js'),
    output: {
      file: path.join(__dirname, 'dist', 'browser.js'),
      format: 'cjs',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
    ],
  },

  // For browser usage via <script> tag
  {
    input: path.join(__dirname, 'src', 'browser.js'),
    output: {
      file: path.join(__dirname, 'dist', 'cross-cookie.js'),
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
  },

  // For React Native packager usage via require() function
  {
    input: path.join(__dirname, 'src', 'react-native.js'),
    external: ['react-native'],
    output: {
      file: path.join(__dirname, 'dist', 'react-native.js'),
      format: 'cjs',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
    ],
  }
];
