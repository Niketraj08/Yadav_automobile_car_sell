/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable dark mode with class strategy
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#D32F2F", // Red accent
                secondary: "#B71C1C", // Darker red
                dark: "#121212",
                "dark-card": "#1E1E1E",
                "dark-light": "#2C2C2C",
                text: "#FFFFFF",
                "text-muted": "#B0B0B0",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')", // Placeholder luxury car bg
            }
        },
    },
    plugins: [],
}
