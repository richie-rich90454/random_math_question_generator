import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import viteCompression from "vite-plugin-compression";
import { viteStaticCopy } from "vite-plugin-static-copy";
export default defineConfig({
    root: "src",
    publicDir: "../public",
    build: {
        outDir: "../dist",
        assetsDir: "assets",
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
            mangle: true,
            module: true,
        },
        cssMinify: "cssnano",
        rollupOptions: {
            input: {
                main: "./index.html",
            },
            output: {
                manualChunks: undefined,
            },
        },
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
        }),
        viteCompression({
            algorithm: "gzip",
            ext: ".gz",
        }),
        viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
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
        port: 3000,
        open: true,
    },
});