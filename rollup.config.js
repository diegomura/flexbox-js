import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import sourceMaps from 'rollup-plugin-sourcemaps';
import bundleSize from 'rollup-plugin-bundle-size';
import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs',
  sourcemap: true,
};

const esm = {
  format: 'es',
  sourcemap: true,
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const commonPlugins = [
  sourceMaps(),
  nodeResolve(),
  babel({
    presets: [['es2015', { modules: false }]],
    plugins: ['external-helpers'],
    runtimeHelpers: true,
  }),
  bundleSize(),
];

const configBase = {
  globals: { react: 'React' },
  plugins: commonPlugins,
  sourcemap: true,
};

const serverConfig = Object.assign({}, configBase, {
  input: './src/index.js',
  output: [
    getESM({ file: 'dist/flexbox-js.es.js' }),
    getCJS({ file: 'dist/flexbox-js.cjs.js' }),
  ]
});

const serverProdConfig = Object.assign({}, serverConfig, {
  output: [
    getESM({ file: 'dist/flexbox-js.es.min.js' }),
    getCJS({ file: 'dist/flexbox-js.cjs.min.js' }),
  ],
  plugins: serverConfig.plugins.concat(uglify()),
});

export default [
  serverConfig,
  serverProdConfig
];
