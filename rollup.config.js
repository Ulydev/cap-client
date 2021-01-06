import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from "svelte-preprocess";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import html from '@rollup/plugin-html';

const production = !process.env.ROLLUP_WATCH;
const version = String(require('child_process').execSync('git rev-parse --short HEAD')).trim(); // append short git commit to bundles

export default {
    input: 'src/main.js',
    output: {
        sourcemap: false,
        format: 'es',
        name: 'app',
        //dir: 'build',
        file: 'build/main.' + version + '.js'
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // we'll extract any component CSS out into
            // a separate file - better for performance
            css: css => {
                css.write('bundle.' + version + '.css');
            },
            preprocess: sveltePreprocess({
                // https://github.com/kaisermann/svelte-preprocess/#user-content-options
                sourceMap: !production,
                postcss: {
                  plugins: [
                     require("tailwindcss"), 
                     require("autoprefixer"),
                     require("postcss-nesting")
                  ],
                },
            }),
            onwarn: (warning, handler) => {
                const { code } = warning;
                if (code === "css-unused-selector")
                    return;
        
                handler(warning);
            },
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        html({

            template: async ({ attributes, files, meta, publicPath, title }) => {
                const script = (files.js || [])
                    .map(({ fileName }) => {
                        return `<script src='/${fileName}'  type="module"></script>`;
                    })
                    .join('\n');

                const css = (files.css || [])
                    .map(({ fileName }) => {
                        return `<link rel='stylesheet' href='/${fileName}'>`;
                    })
                    .join('\n');
                return `
<!DOCTYPE html>
<html lang="en" class="bg">
<head>
    <meta charset='utf-8'>
    <title>Cap</title>
    <meta name="description" content="">
    <meta name="application-name" content="Cap">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, minimum-scale=1, user-scalable=no,minimal-ui">

    <meta name="apple-mobile-web-app-capable" content="yes">

    <link rel="icon" href="assets/favicon.ico?v=1.1"> 
    <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
    <link rel="manifest" href="assets/site.webmanifest">
    <link rel="mask-icon" href="assets/safari-pinned-tab.svg" color="#1BFF49">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#080c10">

    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:title" content="Cap"/>
    <meta name="twitter:image" content="https://cap.finance/assets/logo-square-256.png"/>
    <meta name="twitter:site" content="@CapDotFinance"/>
    <meta property="og:title" content="Cap"/>
    <meta property="og:site_name" content="cap.finance"/>
    <meta property="og:image" content="https://cap.finance/assets/logo-square-256.png" />
    
    <style>
        html {
          box-sizing: border-box;
          font-size: 1em;
          line-height: 1.15; /* 1 */
          -webkit-text-size-adjust: 100%; /* 2 */
        }

        *, *:before, *:after {
          box-sizing: inherit;
        }

        body, h1, h2, h3, h4, h5, h6, p, ol, ul {
          margin: 0;
          padding: 0;
          font-weight: normal;
        }

        ol, ul {
          list-style: none;
        }

        img {
          max-width: 100%;
          height: auto;
        }
    </style>

    ${css}
    ${script}

</head>

<body>
</body>
</html>`;

            }

        }),

        copy({ targets: [{ src: 'public/*', dest: 'build' }] }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `build` directory and refresh the
        // browser on changes when not in production
        !production && livereload('build'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false,
        chokidar: {
            usePolling: true
        }
    }
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}
