import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5',
        lg: '2rem'
      }
    }
  },

  plugins: [
    function ({
      addUtilities
    }: {
      addUtilities: (utilities: any, options?: any) => void
    }) {
      const newUtilities = {
        '.custom-shadow': {
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        },
        '.custom-transition': {
          transition: 'all .3s ease'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ]
}
export default config
