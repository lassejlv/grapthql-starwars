import { defineConfig } from '@pandacss/dev';

export default defineConfig({
   // Whether to use css reset
   preflight: true,

   // Where to look for your css declarations
   include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

   // Files to exclude
   exclude: [],

   // Useful for theme customization
   theme: {
      extend: {
         tokens: {
            colors: {
               dark: { value: '#0d181e' },
               darkerLighter: { value: '#0a1419' },
               blue: { value: '#5f8598' },
               midDarkerBlue: { value: '#3b5f72' },
               darkerBlue: { value: '#2b4a5f' },
            },
         },
      },
   },

   // The output directory for your css system
   outdir: 'styled-system',
});
