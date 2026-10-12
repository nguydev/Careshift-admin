import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#052255",
        secondary: "#31BAC4",
        playground: "#052255",
      },
    },
  },
  plugins: [],
}; 