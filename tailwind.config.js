/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    container: false,
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./static/**/*.{yml,yaml}",
  ],
  theme: {
    screens: {
      sm: '768px',
      md: '1000px',
      lg: '1256px', // Originally spec'd for 1240px, but increased for gutter spacing on containers at 1256px+
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      'electric-lime': '#d8ff34',
      'summer-rain': '#40ebd5',
      voltage: '#c16fff',
      'not-dark-blue': '#071014',
      'background-blue': '#122933',
      gray: '#bebebe',
      'dark-gray': '#333333',
      cream: '#f8f7f3',
      'deep-sea': '#091319',
      slate: '#3a474d',
    }),
    fontFamily: {
      sans: [
        'Haffer',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: [
        'Teodor',
        'ui-serif',
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif'
      ],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.5rem', { lineHeight: '4rem' }],
      '7xl': ['4rem', { lineHeight: '4.5rem' }],
      '8xl': ['4.5rem', { lineHeight: '5rem' }],
      '9xl': ['5rem', { lineHeight: '5.5rem' }],
      '10xl': ['5.5rem', { lineHeight: '6rem' }],
      '11xl': ['6rem', { lineHeight: '7rem' }],
    },
    extend: {
      spacing: {
        22: '5.5rem',
        23: '5.75rem',
        30: '7.5rem',
      },
      letterSpacing: {
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        '-1': '-1px',
        '-2': '-2px',
        '-3': '-3px',
        '-4': '-4px',
        snug: '-0.0125em',
      },
      blur: {
        '3xl': '56px',
      },
      transitionDelay: {
        250: '250ms',
      },
      typography: ({ theme }) => ({
        cream: {
          css: {
            '--tw-prose-body': theme('colors.cream'),
            '--tw-prose-headings': theme('colors.cream'),
            '--tw-prose-lead': theme('colors.cream'),
            '--tw-prose-links': theme('colors.cream'),
            '--tw-prose-bold': theme('colors.cream'),
            '--tw-prose-counters': theme('colors.cream'),
            '--tw-prose-bullets': theme('colors.cream'),
            '--tw-prose-hr': theme('colors.cream'),
            '--tw-prose-quotes': theme('colors.cream'),
            '--tw-prose-quote-borders': theme('colors.cream'),
            '--tw-prose-captions': theme('colors.cream'),
            '--tw-prose-code': theme('colors.cream'),
            '--tw-prose-pre-code': theme('colors.cream'),
            '--tw-prose-pre-bg': theme('colors.cream'),
            '--tw-prose-th-borders': theme('colors.cream'),
            '--tw-prose-td-borders': theme('colors.cream'),
            '--tw-prose-invert-body': theme('colors.cream'),
            '--tw-prose-invert-headings': theme('colors.cream'),
            '--tw-prose-invert-lead': theme('colors.cream'),
            '--tw-prose-invert-links': theme('colors.cream'),
            '--tw-prose-invert-bold': theme('colors.cream'),
            '--tw-prose-invert-counters': theme('colors.cream'),
            '--tw-prose-invert-bullets': theme('colors.cream'),
            '--tw-prose-invert-hr': theme('colors.cream'),
            '--tw-prose-invert-quotes': theme('colors.cream'),
            '--tw-prose-invert-quote-borders': theme('colors.cream'),
            '--tw-prose-invert-captions': theme('colors.cream'),
            '--tw-prose-invert-code': theme('colors.cream'),
            '--tw-prose-invert-pre-code': theme('colors.cream'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.cream'),
            '--tw-prose-invert-td-borders': theme('colors.cream'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
