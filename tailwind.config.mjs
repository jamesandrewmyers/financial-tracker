import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [typography, forms, daisyui],
  daisyui: { themes: true },
};