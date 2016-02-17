# ember-cli-svgstore [![Build Status](https://travis-ci.org/salsify/ember-cli-svgstore.svg?branch=master)](https://travis-ci.org/salsify/ember-cli-svgstore)

This Ember-CLI addon uses [broccoli-svgstore](https://github.com/jmarquis/broccoli-svgstore) to combine the contents
of individual SVG files as named symbols in one (or more) master SVGs.

The technique employed is outlined in [this CSS Tricks post](http://css-tricks.com/svg-sprites-use-better-icon-fonts/).

## Installation

```
npm install --save-dev ember-cli-svgstore
```

## Usage

The configuration below would combine all SVGs under e.g. `app/icons` into one file `icons.svg`:

```js
// ember-cli-build.js

var app = new EmberApp(defaults, {
  svgstore: {
    files: {
      sourceDirs: 'app/icons',
      outputFile: '/assets/icons.svg'
    }
  }
});
```

Given an input file in `app/icons/user.svg`, the contents of that file could be embedded in a page like so:

```html
  <svg role="img">
    <use xlink:href="/assets/icons.svg#user"></use>
  </svg>
```

SVGs that are processed by this addon are usually more or less static assets, and it makes sense for them to live in the project's `public/` dir. However, since ember-cli automatically includes all files in `/public` in the build, they effectively get duplicated. To prevent processed files from ending up in `dist/`, use the `excludeSourceFiles` flag:

```js
// ember-cli-build.js

var app = new EmberApp(defaults, {
  svgstore: {
    excludeSourceFiles: true, // exclude all processed source files
    files: {
      sourceDirs: [ 'public/icons' ],
      outputFile: '/assets/icons.svg',
      excludeSourceFiles: true // exclude source files only for this master SVG
    }
  }
});
```

Note that if your source SVGs are in any other directory (i.e. `/app`, `/vendor`, etc.), they will not automatically be included in the build, and the `excludeSourceFiles` option is not necessary.

## Options

### `files`
May be a single object or an array. Each object should have the following two keys:
 - `sourceDirs` a string or array of strings specifying the directories that should be crawled for SVGs to include
 - `outputFile` the destination to write the final SVG to
 - `excludeSourceFiles` whether the files in `sourceDirs` are excluded from the build or not


### `excludeSourceFiles`
Boolean indicating whether all source files should be excluded from the build or not, defaults to `false`.
