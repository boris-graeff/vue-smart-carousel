import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import commonjs from 'rollup-plugin-commonjs';
import pkg from '../package.json';

const external = Object.keys(pkg.dependencies);

export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: {
        name: 'VueSmartCarousel',
        exports: 'named',
    },
    plugins: [
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5,
        commonjs()
    ],
    external
};
