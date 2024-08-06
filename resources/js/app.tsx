import "./bootstrap";
import "../css/app.css";

import { ThemeProvider } from "./Components/ThemeProvider";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "@/Components/ui/sonner";
import QueryProvider from "./Components/QueryProvider";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body>
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>

                <QueryProvider>
                    <App {...props} />
                </QueryProvider>
              
                <Toaster
                    richColors
                    theme="dark"
                    duration={2345}
                    closeButton
                    position="top-center"
                />
            </ThemeProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
