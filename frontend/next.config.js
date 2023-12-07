const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  env: {
    USERPOOL_ID: process.env.USERPOOL_ID,
    USERPOOL_CLIENT_ID: process.env.USERPOOL_CLIENT_ID,
  },
  reactStrictMode: false,
})

module.exports = withNextra()
