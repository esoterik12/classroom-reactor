import type { Config } from 'tailwindcss'
import { withUt } from 'uploadthing/tw'

export default withUt(
  {
    // const config: Config = {
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
          md: '1.5rem',
          lg: '2rem'
        }
      },
      colors: {
        primary: {
          100: '#C2E2FA',
          200: '#93D0F5',
          300: '#64BDF1',
          400: '#2FAAED',
          500: '#078AED', // base
          600: '#0671C9',
          700: '#0559A5',
          800: '#044180',
          900: '#032966'
        },
        secondary: {
          100: '#FFF2CC',
          200: '#FFE599',
          300: '#FFD966',
          400: '#FFCD33',
          500: '#FFC759', // base
          600: '#CC9F47',
          700: '#997735',
          800: '#665024',
          900: '#332814'
        },
        jet: {
          100: '#78787A',
          200: '#68686A',
          300: '#58585A',
          400: '#474749',
          500: '#323234', // base
          600: '#29292B',
          700: '#202021',
          800: '#171718',
          900: '#0E0E0F'
        },
        offWhite: {
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FEFEFE',
          400: '#FDFDFD',
          500: '#F5F5F5', // base
          600: '#EDEDED',
          700: '#E5E5E5',
          800: '#DDDDDD',
          900: '#D5D5D5'
        },
        gray: {
          100: '#E3E3E3',
          200: '#D2D2D2',
          300: '#C1C1C1',
          400: '#B0B0B0',
          500: '#9E9E9E', // base
          600: '#8A8A8A',
          700: '#767676',
          800: '#626262',
          900: '#4E4E4E'
        },
        grayLight: {
          100: '#FAFAFB',
          200: '#F6F6F8',
          300: '#F3F3F6',
          400: '#F0F0F3',
          500: '#F3F4F6', // base
          600: '#E1E2E4',
          700: '#CFD0D2',
          800: '#BDBEC0',
          900: '#ABACAE'
        },
        green: {
          100: '#D1EED1',
          200: '#A3DEA3',
          300: '#75CD75',
          400: '#47BD47',
          500: '#59CD90', // base
          600: '#3DA36D',
          700: '#2D7A4A',
          800: '#1D5127',
          900: '#0D2804'
        },
        secondaryLight: '#FFD685'
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
  // export default config
)
