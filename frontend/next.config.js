const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  env: {
    USERPOOL_ID: process.env.USERPOOL_ID,
    USERPOOL_CLIENT_ID: process.env.USERPOOL_CLIENT_ID,
    NEXT_PUBLIC_PROD_API_SIGNIN_URL: process.env.NEXT_PUBLIC_PROD_API_SIGNIN_URL,
    NEXT_PUBLIC_PROD_API_SIGNOUT_URL: process.env.NEXT_PUBLIC_PROD_API_SIGNOUT_URL,
    NEXT_PUBLIC_PROD_API_RENEW_SESSION_URL: process.env.NEXT_PUBLIC_PROD_API_RENEW_SESSION_URL,
    NEXT_PUBLIC_PROD_API_CHECK_ACCESS_TOKEN_URL: process.env.NEXT_PUBLIC_PROD_API_CHECK_ACCESS_TOKEN_URL,
  },
  reactStrictMode: false,
})

module.exports = withNextra()
