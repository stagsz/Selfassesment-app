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
        // ─── Primary: Sage Green ───
        sage: {
          50:  '#f4f7f3',
          100: '#e6ede4',
          200: '#cddbc9',
          300: '#a8c499',
          400: '#8baa7e',
          500: '#6b8f5e',
          600: '#557349',
          700: '#445c3b',
          800: '#384b32',
          900: '#2e3e2a',
          950: '#172015',
        },
        // ─── Accent: Soft Blue ───
        sky: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffe',
          300: '#7cc5fd',
          400: '#36a8fa',
          500: '#0c8deb',
          600: '#0070c9',
          700: '#0159a3',
          800: '#064c86',
          900: '#0b406f',
          950: '#07294a',
        },
        // ─── Surface / Neutral ───
        surface: {
          50:  '#fafaf9',
          100: '#f5f5f3',
          200: '#ececea',
          300: '#ddddd9',
          400: '#b8b8b3',
          500: '#98988f',
          600: '#7a7a70',
          700: '#64645c',
          800: '#53534d',
          900: '#474743',
          950: '#252523',
        },
        // ─── Semantic: Status colors ───
        success: {
          50:  '#eefbf3',
          100: '#d6f5e0',
          200: '#b0eac6',
          300: '#7cd9a5',
          400: '#46c17e',
          500: '#23a663',
          600: '#16874f',
          700: '#126c41',
          800: '#115636',
          900: '#0f472d',
        },
        warning: {
          50:  '#fffbeb',
          100: '#fff3c6',
          200: '#ffe588',
          300: '#ffd24a',
          400: '#ffbe20',
          500: '#f99d07',
          600: '#dd7602',
          700: '#b75306',
          800: '#943f0c',
          900: '#7a340d',
        },
        danger: {
          50:  '#fff1f1',
          100: '#ffe0e0',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6969',
          500: '#f83b3b',
          600: '#e51d1d',
          700: '#c11414',
          800: '#a01414',
          900: '#841818',
        },
        info: {
          50:  '#eff8ff',
          100: '#dbeffe',
          200: '#bfe3fe',
          300: '#93d3fd',
          400: '#60b9fa',
          500: '#3b9af6',
          600: '#257ceb',
          700: '#1d65d8',
          800: '#1e52af',
          900: '#1e478a',
        },
        // ─── CSS variable-driven tokens (shadcn compat) ───
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Legacy compat aliases
        primary: {
          50:  '#f4f7f3',
          100: '#e6ede4',
          200: '#cddbc9',
          300: '#a8c499',
          400: '#8baa7e',
          500: '#6b8f5e',
          600: '#557349',
          700: '#445c3b',
          800: '#384b32',
          900: '#2e3e2a',
        },
        // Keep harmony aliases for existing cyclic-harmony components
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
        // Keep isoPrimary alias for existing button refs
        isoPrimary: {
          600: '#557349',
          700: '#445c3b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '1rem',
        'crown': '1.5rem',
        'crown-lg': '2rem',
      },
      boxShadow: {
        // Material Design 3 inspired elevation system
        'elevation-0': 'none',
        'elevation-1': '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'elevation-2': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
        'elevation-3': '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.06)',
        'elevation-4': '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.06)',
        // Colored elevation for primary actions
        'sage-glow': '0 4px 14px 0 rgba(85, 115, 73, 0.25)',
        'sage-glow-lg': '0 8px 24px 0 rgba(85, 115, 73, 0.30)',
        // Keep legacy
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
        'enter': 'enter 0.2s ease-out',
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
        enter: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
