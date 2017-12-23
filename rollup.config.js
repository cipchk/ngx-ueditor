const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');

const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/router': 'ng.router',
    '@angular/forms': 'ng.forms',
    '@angular/common/http': 'ng.common.http',

    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/operators': 'Rx.Observable.prototype'
};

module.exports = {
    sourcemap: true,
    rollup: require('rollup'),
    context: 'this',
    name: 'ngx-ueditor',
    output: 'ngx-ueditor.umd.js',
    format: 'umd',
    plugins: [
        resolve({
            jsnext: true,
            main: true
        })
    ],
    external: Object.keys(globals),
    globals: globals
};
