/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#061D15',
          forest: '#0C3524',
          emerald: '#13543A',
          leaf: '#1F7A56',
          mint: '#EBF7F2',
          gold: '#C59B27',
          goldLight: '#E8BF4C',
          goldSubtle: '#FBF4E2',
          slate: '#0F172A',
          slateMuted: '#475569',
          cream: '#FAF9F6',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glow': '0 0 25px rgba(197, 155, 39, 0.25)',
        'card-hover': '0 20px 40px -15px rgba(12, 53, 36, 0.12)',
      },
    },
  },
  plugins: [],
}
