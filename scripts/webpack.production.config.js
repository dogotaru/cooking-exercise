const
    webpack = require("webpack"),
    htmlWebpackPlugin = require("html-webpack-plugin"),
    fs = require("fs"),
    BundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin,
    TerserPlugin = require("terser-webpack-plugin");

module.exports = function (env, argv) {

    const
        ENV = env.ENV || "production",
        sourceMap = false,
        packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8")),
        config = JSON.parse(fs.readFileSync(`./config/env.${ENV.toLowerCase()}.json`)),
        {assetsAppBase = "", urlAppRoot} = config,
        {name: appName, version} = packageJson,
        banner = `/* Application [version: ${version}, environment: ${ENV}] */`,
        scopedNameIdentPattern = "st[hash:base64:4]",
        babelConfig = {
            // .babelrc
            presets: [["@babel/preset-env", {
                targets: {"browsers": ["IE >= 11"]},
                modules: false
            }], "@babel/react", "@babel/typescript"],
            plugins: [
                "jsx-control-statements", "transform-react-jsx", "@babel/plugin-proposal-export-namespace-from",
                "@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"
            ],
            cacheCompression: false,
            cacheDirectory: false
        };

    const webpackConfig = {
        mode: "production",
        cache: false, //https://webpack.js.org/configuration/other-options/#cache
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true
                    },
                    output: {
                        comments: false,
                        ascii_only: true
                    },
                    mangle: {
                        keep_fnames: false
                    }
                }
            })],
            sideEffects: false,
            splitChunks: {
                chunks: "async",
                hidePathInfo: true,
                maxInitialRequests: 1,
                cacheGroups: {
                    default: false,
                    commons: false,
                    vendors: false,
                    defaultVendors: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        maxSize: 300000,
                        minSize: 280000,
                        priority: -20
                    }
                },
                minSize: 10000
            }
        },
        entry: {
            bundle: [
                "./src/index.tsx"
            ]
        },
        output: {
            library: {
                name: appName,
                type: "umd"
            },
            globalObject: "window",
            path: __dirname + "/../build/app",
            publicPath: `${assetsAppBase}/`,
            filename: "[name].js",
            chunkFilename: "[name].[contenthash:8].chunk.js"
        },
        devtool: sourceMap ? "source-map" : false,
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                attributes: {id: "stylesMain"},
                                insert: "head",
                                injectType: "styleTag"
                            }
                        },
                        {
                            loader: "css-loader", options: {
                                modules: true, localIdentName: scopedNameIdentPattern,
                                sourceMap
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sassOptions: {
                                    outputStyle: "expanded",
                                    indentedSyntax: false
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                attributes: {id: "stylesLess"},
                                insert: "head",
                                injectType: "styleTag"
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: scopedNameIdentPattern,
                                sourceMap: sourceMap
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true,
                                    modifyVars: {
                                        // "@reset-import": false,
                                        "@icon-font-path": "./fonts"
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{loader: "babel-loader", options: babelConfig}]
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {loader: "babel-loader", options: babelConfig},
                        {loader: "ts-loader"}
                    ]
                },
                {
                    test: /\.(png|gif|jpg|jpeg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[hash:6].[ext]",
                                outputPath: "assets/style/img/",
                                publicPath: `${assetsAppBase}/assets/style/img/`,
                                esModule: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[hash:6].[ext]",
                                outputPath: "assets/style/svg/",
                                publicPath: `${assetsAppBase}/assets/style/img/`,
                                esModule: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[hash:6].[ext]",
                                outputPath: "assets/style/fonts/",
                                publicPath: `${assetsAppBase}/assets/style/fonts/`,
                                esModule: false
                            }
                        }
                    ]
                },
                {test: /\.ejs$/, loader: "ejs-compiled-loader"}
            ]
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"]
        },
        externals: {},
        plugins: [
            new htmlWebpackPlugin({
                hash: false,
                inject: false,
                filename: "../index.html",
                template: "./resources/index.ejs",
                basePath: `${urlAppRoot}/`,
                favicon: './resources/img/favicon.png',
                assetsAppBase
            }),
            new webpack.BannerPlugin({
                banner,
                raw: true,
                entryOnly: true
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    CONFIG_ENV: JSON.stringify(ENV),
                    APP_VERSION: JSON.stringify(version),
                }
            }),
            new webpack.optimize.AggressiveMergingPlugin()
        ]
    };

    if (ENV !== "production") {

        // webpackConfig.plugins.push(new Visualizer({ filename: "./report-webpack-visualizer-plugin.html" }));

        webpackConfig.plugins.push(new BundleAnalyzer({
            analyzerMode: "static",
            reportFilename: "./report-webpack-bundle-analyzer.html",
            openAnalyzer: false
        }));
    }

    return webpackConfig;
};
