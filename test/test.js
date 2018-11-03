const assert = require('assert');
const { rollup } = require("rollup");
const uglify = require('../');

describe('rollup-plugin-uglify', () => {
  it('minifies', async () => {

    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [uglify()]
    });

    const result = await bundle.generate({ format: 'cjs' });

    assert.equal(result.code, '\'use strict\';\n\nvar name="Matt";"M"==name[0]&&console.log("Hello "+name);\n');
  });
  it('uses options', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [
        uglify({ output: { comments: 'all' } })
      ]
    });

    const result = await bundle.generate({ format: 'cjs' });

    assert.equal(result.code, '\'use strict\';\n\n// say hello\nvar name="Matt";"M"==name[0]&&console.log("Hello "+name);\n');
  });

  it('generates a source map by default', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [uglify()]
    });

    const result = await bundle.generate({ format: 'cjs', sourcemap: true });

    assert.ok(result.map);
  });

  it('allows disabling source maps', async () => {
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      plugins: [uglify({ sourceMap: false })]
    });

    const result = await bundle.generate({ format: 'cjs' });

    assert.equal(result.map, null);
  });

  it('throws if UglifyJS throws', async () => {
    await assert.rejects((async () => {
      const bundle = await rollup({
        input: 'test/fixtures/error.js',
        plugins: [uglify({ sourceMap: false })]
      });

      await bundle.generate({ format: 'cjs' });
    })());
  });

  it('raises warnings if UglifyJS raises warnings', async () => {
    let warnings = [];
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      onwarn (warning) {
        warnings.push(warning);
      },
      plugins: [uglify({ sourceMap: { content: 'inline' } })],
    });

    await bundle.generate({ format: 'cjs' });

    assert.equal(1, warnings.length);
    assert.equal('inline source map not found: 0', warnings.pop().message);
  });

  it('allows disabling warnings', async () => {
    let warnings = [];
    const bundle = await rollup({
      input: 'test/fixtures/unminified.js',
      onwarn (warning) {
        warnings.push(warning);
      },
      plugins: [uglify({ warnings: false, sourceMap: { content: 'inline' } })],
    });

    await bundle.generate({ format: 'cjs' });

    assert.equal(0, warnings.length);
  });
});
