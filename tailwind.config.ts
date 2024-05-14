import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin';

export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/App.tsx',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      'kanit': ['Kanit', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        'sm': '1px 1px 2px rgb(0, 0, 0)',
      },
      gridTemplateRows: {
        'title': '0.65fr 1fr 1fr'
      },
      textShadow: {
        DEFAULT: '1px 1px 2px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
} satisfies Config
