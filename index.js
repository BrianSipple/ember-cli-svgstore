var merge = require('merge');
var svgstore = require('broccoli-svgstore');
var makeArray = require('make-array');
var unwatchedTree = require('broccoli-unwatched-tree');
var funnel = require('broccoli-funnel');
var BroccoliMergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-svgstore',
  
  options: function() {
    return this._options = this._options || merge(true, {}, {
      files: []
    }, this.app.options.svgstore || {});
  },

  treeForPublic: function() {
    var trees = this._makeSvgTrees(this.options().files);
    return this._maybeMerge(trees, 'output');
  },

  // Remove sprite files from the dist if they originate in the `/public` dir
  postprocessTree: function(type, tree) {
    if (type !== 'all') {
      return tree;
    }

    var options = this.options();
    var globalExclude = options.excludeSourceFiles;
    var excludeGlobs = makeArray(this.options().files).reduce(function(result, fileSpec) {
      var paths = [];

      // Remove only if the `excludeSourceFiles` option is set
      if (globalExclude || fileSpec.excludeSourceFiles) {
        paths = makeArray(fileSpec.sourceDirs).filter(function(dir) {
          return dir.match(/^public\//);
        }).map(function(dir) {
          return dir.replace(/^public\//, '') + '/*';
        });
      }

      return result.concat(paths);
    }, []);

    if (excludeGlobs.length) {
      tree = funnel(tree, {
        exclude: excludeGlobs
      });
    }

    return tree;
  },

  _makeSvgTrees: function(files) {
    return makeArray(files).map(function(fileSpec) {
      return svgstore(this._makeSourceTree(fileSpec), { outputFile: fileSpec.outputFile });
    }, this);
  },

  _makeSourceTree: function(fileSpec) {
    var inputs = makeArray(fileSpec.sourceDirs).map(unwatchedTree);
    return this._maybeMerge(inputs, 'sources: ' + fileSpec.outputFile);
  },

  _maybeMerge: function(trees, description) {
    trees = makeArray(trees);
    if (trees.length === 1) {
      return trees[0];
    } else {
      return new BroccoliMergeTrees(trees, {
        description: 'TreeMerger (svgstore ' + description + ')'
      });
    }
  }
};
