# ember-cli-svgstore

This Ember-CLI plugin uses [broccoli-svgstore](https://github.com/jmarquis/broccoli-svgstore) to combine the contents
of individual SVG files as named symbols in one (or more) master SVGs.

The technique employed is outlined in [this CSS Tricks post](http://css-tricks.com/svg-sprites-use-better-icon-fonts/).

## Installation

```
npm install --save-dev ember-cli-svgstore
```

## Usage

The configuration below would combine all SVGs under e.g. `app/icons` into one file `icons.svg`:

```js
// Brocfile.js

var app = new EmberApp({
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

## Options

### `files`
May be a single object or an array. Each object should have the following two keys:
 - `sourceDirs` a string or array of strings specifying the directories that should be crawled for SVGs to include
 - `outputFile` the destination to write the final SVG to