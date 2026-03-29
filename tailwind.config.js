/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        felt: '#0B3D2E',
        surface: '#1A1A2E',
        gold: '#FFD700',
        magenta: '#FF2D78',
        teal: '#00F5D4',
        cream: '#F5E6C8',
        'neon-green': '#39FF14',
        'neon-red': '#FF3131',
        'surface-2': '#252540',
      },
      fontFamily: {
        display: ['"Abril Fatface"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        burst: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        trot: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-4px) scale(1.15)' },
        },
        racePulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(255,215,0,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255,215,0,0.7)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s ease-in-out infinite',
        burst: 'burst 0.4s ease-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in forwards',
        slideUp: 'slideUp 0.3s ease-out forwards',
        trot: 'trot 0.5s ease-in-out infinite',
        racePulse: 'racePulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
