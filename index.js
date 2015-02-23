var merge = require('merge');
var svgstore = require('broccoli-svgstore');
var makeArray = require('make-array');
var unwatchedTree = require('broccoli-unwatched-tree');

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
      return this.mergeTrees(trees, {
        description: 'TreeMerger (svgstore ' + description + ')'
      });
    }
  }
};