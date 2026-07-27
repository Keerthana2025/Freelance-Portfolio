/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './main.js', './*.js'],
  theme: {
    extend: {
      colors: {
        ink: {
          50:  '#f7f8fa',
          100: '#eef0f4',
          200: '#dfe3ea',
          300: '#c2c9d6',
          400: '#94a0b5',
          500: '#67738c',
          600: '#4a5468',
          700: '#353d4d',
          800: '#222936',
          900: '#141923',
          950: '#0b0e15',
        },
        accent: {
          50:  '#ecfbf3',
          100: '#d2f5e1',
          200: '#a6ebc6',
          300: '#6bdba3',
          400: '#37c47e',
          500: '#16a863',
          600: '#0c864f',
          700: '#0a6b41',
          800: '#0b5436',
          900: '#0a452d',
        },
        gold: {
          400: '#f0c14b',
          500: '#e0a82e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -15px rgba(20,25,35,0.35)',
        glow: '0 0 60px -10px rgba(22,168,99,0.45)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        blob: 'blob 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
