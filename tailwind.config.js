/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",

      primaryForeground: "var(--primary-foreground)",
      secondaryForeground: "var(--secondary-foreground)",

      card: "var(--card)",
      cardForeground: "var(--card-foreground)",

      border: "var(--border)",
      active: "var(--active)",
    },
    extend: {
      backgroundImage: {
        checked: "var(--checked)",
      },
    },
  },
  plugins: [],
};
