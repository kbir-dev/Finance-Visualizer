/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0B1121',
          lighter: '#162032',
          card: '#1C2A3F',
        },
        accent: {
          primary: '#7C3AED',
          secondary: '#DB2777',
          success: '#059669',
          warning: '#D97706',
          danger: '#DC2626',
        },
        glow: {
          primary: '#7C3AED1A',
          success: '#0596691A',
          danger: '#DC26261A',
        }
      },
      boxShadow: {
        'glow': '0 0 20px 5px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
        slideUp: 'slideUp 0.3s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        pulseLight: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}