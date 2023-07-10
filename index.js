const postcss = require('postcss')
const fs = require('fs')

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  let selectors = new Set()
  const stylesheetsToDiff = opts.paths || [];

  stylesheetsToDiff.forEach(path => {
    postcss.parse(fs.readFileSync(path)).walkRules(rule => {
      selectors.add(rule.selector)
    })
  });

  return {
    postcssPlugin: 'diff',

    Rule(rule) {
      if (
        selectors.has(rule.selector) ||
        selectors.has(`[dir=ltr] ${rule.selector}`)
      ) {
        rule.remove()
      }
    },
  }
}

module.exports.postcss = true
