import type { Config } from "tailwindcss" assert { "resolution-mode": "import" }

export default {
    darkMode: "class",
    presets: [require("@medusajs/ui-preset")],
    content: [
        "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                background: "hsl(var(--color-background))",
                foreground: "hsl(var(--color-foreground))",
                card: "hsl(var(--color-card))",
                "card-foreground": "hsl(var(--color-card-foreground))",
                popover: "hsl(var(--color-popover))",
                "popover-foreground": "hsl(var(--color-popover-foreground))",
                primary: "hsl(var(--color-primary))",
                "primary-foreground": "hsl(var(--color-primary-foreground))",
                secondary: "hsl(var(--color-secondary))",
                "secondary-foreground": "hsl(var(--color-secondary-foreground))",
                muted: "hsl(var(--color-muted))",
                "muted-foreground": "hsl(var(--color-muted-foreground))",
                accent: "hsl(var(--color-accent))",
                "accent-foreground": "hsl(var(--color-accent-foreground))",
                destructive: "hsl(var(--color-destructive))",
                "destructive-foreground": "hsl(var(--color-destructive-foreground))",
                border: "hsl(var(--color-border))",
                input: "hsl(var(--color-input))",
                ring: "hsl(var(--color-ring))",
            },
            transitionProperty: {
                width: "width margin",
                height: "height",
                bg: "background-color",
                display: "display opacity",
                visibility: "visibility",
                padding: "padding-top padding-right padding-bottom padding-left",
            },
            maxWidth: {
                "8xl": "100rem",
            },
            screens: {
                "2xsmall": "320px",
                xsmall: "512px",
                small: "1024px",
                medium: "1280px",
                large: "1440px",
                xlarge: "1680px",
                "2xlarge": "1920px",
            },
            fontSize: {
                "3xl": "2rem",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Ubuntu",
                    "sans-serif",
                ],
                guakala: ["var(--font-guakala)"],
                "scratchy-lemon": ["var(--font-scratchy-lemon)"],
                "good-brush": ["var(--font-good-brush)"],
                caveat: ["var(--font-caveat)"],
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
} satisfies Config;
