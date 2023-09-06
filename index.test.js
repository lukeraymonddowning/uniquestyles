const postcss = require('postcss')

const plugin = require('./')
const path = require("path");

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('removes duplicate selectors', async () => {
  await run ('.test {} .keep {} .test-2 {}', '.keep {}', { paths: [ path.join(__dirname, 'fixtures/base.css') ] })
});

it('can compensate for different ordering across stylesheets', async () => {
  await run ('h1, h2, h3 {}', '', { paths: [ path.join(__dirname, 'fixtures/specificity.css') ] })
});
