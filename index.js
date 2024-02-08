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
      selectors.add(normalizeSelectors(rule))
    })
  });

  return {
    postcssPlugin: 'uniquestyles',

    Rule(rule) {
      const selector = normalizeSelectors(rule)

      if (
        selectors.has(selector) ||
        selectors.has(`[dir=ltr] ${selector}`)
      ) {
        rule.remove()
      }
    },
  }
}

module.exports.postcss = true

function normalizeSelectors(rule) {
  const selectors = Array.from(new Set([...rule.selectors]))
  selectors.sort()

  return selectors
      .map(selector => (rule.parent.type === 'atrule' ? `@${rule.parent.name}.${rule.parent.params}.${selector}` : selector)
      .replace(/'/g, '"')
      .replace(/::(before|after)/g, ':$1')
      .replace(/\[(.+)=['"]?([a-zA-Z_-]+?)['"]?\]/g, '[$1=$2]')
    )
    .join(', ')
}
