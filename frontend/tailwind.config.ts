import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cyclic Harmony Color Palette
        harmony: {
          sage: '#8BAA7E',
          olive: '#5C7C52',
          forest: '#3D5A3A',
          lime: '#A8C499',
          'warm-white': '#F5F5F0',
          'light-beige': '#E8E8E0',
          'warm-gray': '#D8D8D0',
          'dark-text': '#333333',
        },
        // Original colors for compatibility
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'crown': '1.5rem',
        'crown-lg': '2rem',
      },
      boxShadow: {
        'crown': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'crown-hover': '0 8px 20px rgba(0, 0, 0, 0.12)',
        'crown-active': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'lift': 'lift 0.3s ease-out',
        'scale-subtle': 'scale-subtle 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'progress-flow': 'progress-flow 2s ease-in-out infinite',
      },
      keyframes: {
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        'scale-subtle': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'progress-flow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      lineHeight: {
        'generous': '1.6',
        'relaxed-plus': '1.75',
      },
    },
  },
  plugins: [],
};

export default config;
