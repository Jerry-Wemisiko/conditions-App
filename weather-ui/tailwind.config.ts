import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/rippleui/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('rippleui')],
}

export default config
