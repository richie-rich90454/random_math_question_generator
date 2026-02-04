import {defineConfig} from "vite";
import {createHtmlPlugin} from "vite-plugin-html";
import {viteStaticCopy} from "vite-plugin-static-copy";
export default defineConfig({
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        assetsDir: "assets",
        minify: "terser",
        cssMinify: true,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: "modules/math.js",
                    dest: "modules",
                },
            ],
        }),
    ],
    server: {
        port: 1331,
        open: true,
    },
    preview: {
        port: 1331,
        open: true,
    }
});