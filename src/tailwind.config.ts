import type {Config} from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-body)', ...fontFamily.sans],
        headline: ['var(--font-headline)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-invert-body': theme('colors.foreground / 90%'),
            '--tw-prose-invert-headings': theme('colors.foreground'),
            '--tw-prose-invert-lead': theme('colors.foreground / 90%'),
            '--tw-prose-invert-links': theme('colors.primary'),
            '--tw-prose-invert-bold': theme('colors.foreground'),
            '--tw-prose-invert-counters': theme('colors.foreground / 80%'),
            '--tw-prose-invert-bullets': theme('colors.primary / 50%'),
            '--tw-prose-invert-hr': theme('colors.border / 50%'),
            '--tw-prose-invert-quotes': theme('colors.primary'),
            '--tw-prose-invert-quote-borders': theme('colors.primary / 50%'),
            '--tw-prose-invert-captions': theme('colors.foreground / 70%'),
            '--tw-prose-invert-code': theme('colors.foreground'),
            '--tw-prose-invert-pre-code': theme('colors.foreground / 90%'),
            '--tw-prose-invert-pre-bg': theme('colors.muted / 50%'),
            '--tw-prose-invert-th-borders': theme('colors.border'),
            '--tw-prose-invert-td-borders': theme('colors.border / 50%'),
          }
        }
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
