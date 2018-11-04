# rollup-plugin-uglify

A rollup plugin to minify javascript with [UglifyJS 3](https://github.com/mishoo/UglifyJS2).  No other dependencies.

# Usage

Any options are passed directly to uglify.  You can view the possible options in the [Uglify docs](https://github.com/mishoo/UglifyJS2#minify-options).  Unless explicitly disabled the `sourceMap` and `warnings` options are enabled so they can be passed to Rollup.

```javascript
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'iife',
      file: 'dist/bundle.js'
    }
  ],
  plugins: [
    uglify()
  ]
};
```

# Contributing

Contributions are welcome.  This project aims to provide a minimal wrapper for Uglify so it can be used with Rollup.  Any features that aren't provided by Uglify itself will likely be rejected.  You can lint and test your code with the commands `npm run lint` and `npm test`.