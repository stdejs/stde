import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import * as meta from './package.json';

export default [{
  input: 'src/index.js',
  output: {
    file: `dist/${meta.name}.js`,
    name: 'stde',
    format: 'umd',
    indent: false,
    extend: true,
    banner: `// ${meta.homepage} v${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}`
  },
  plugins: [
    babel({
      'plugins': ['@babel/plugin-proposal-nullish-coalescing-operator']
    }),
    terser(),
    visualizer()
  ],
}];
