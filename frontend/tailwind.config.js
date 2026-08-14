/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                glow: "0 20px 80px rgba(15, 23, 42, 0.18)",
            },
            backgroundImage: {
                "hero-grid":
                    "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 30%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.16), transparent 28%), linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.95))",
            },
        },
    },
    plugins: [],
};
