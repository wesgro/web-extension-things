import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    server: {},
    build: {
        rollupOptions: {
            input: {
                app: resolve(__dirname, "popup.html"),
                content: resolve(__dirname, "./src/content.ts"),
                background: resolve(__dirname, "./src/background.ts"),
            },
            output: {
                entryFileNames: `assets/[name].js`,
            },
            plugins: [
                AutoImport({
                    imports: [
                        {
                            "webextension-polyfill": [["*", "browser"]],
                        },
                    ],
                }),
            ],
        },
    },
    plugins: [react()],
    optimizeDeps: {
        exclude: ["webextension-polyfill"],
    },
});
