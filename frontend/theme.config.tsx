import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import SignOutButton from './components/SignOutButton'

const config: DocsThemeConfig = {
  logo: <span className='font-semibold'>NEXTRA COGNITO</span>,
  faviconGlyph: '📝',
  project: {
    link: 'https://github.com/shuding/nextra-docs-template',
  },
  // chat: {
  //   link: 'https://discord.com',
  // },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Nextra Docs Template',
  },
  navbar: {
    extraContent: <SignOutButton />,
  }
}

export default config
