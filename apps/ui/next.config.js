// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // enable SVGR to support rendering SVG's as components @see https://github.com/gregberge/svgr
    svgr: true,
  },
}

module.exports = withNx(nextConfig)
