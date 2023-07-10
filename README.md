# postcss-diff

[PostCSS] plugin that strips selectors found in other stylesheets..

[PostCSS]: https://github.com/postcss/postcss

## Introduction

This plugin is primarily intended to be used inside Laravel Nova to strip out Tailwind selectors in your custom field/card/tool css file that are already defined in the Nova stylesheet.
This ensures that your custom css file is as small as possible and doesn't cause style conflicts with Nova.

## Configuration

You should configure this plugin by passing CSS files you want to compare against to the `paths` option:

```js
// postcss.config.js
const path = require("path");

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    prune: {
      paths: [
          path.join(__dirname, "../../public/vendor/nova/app.css"),
      ]
    },
  }
}
```

## Attribution

This plugin was created for the Laravel Nova Mastery 2023 course and is pretty much verbatim from [work done by Aaron Francis](https://twitter.com/aarondfrancis/status/1636438221558038569?s=20).
All credit goes to him for the idea and implementation.
