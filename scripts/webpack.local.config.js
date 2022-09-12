const
    webpack = require("webpack"),
    htmlWebpackPlugin = require("html-webpack-plugin"),
    fs = require("fs"),
    ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = function (env, argv) {

    const
        ENV = env.ENV || "local",
        sourceMap = true,
        packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8")),
        config = JSON.parse(fs.readFileSync(`./config/env.${ENV.toLowerCase()}.json`)),
        {assetsAppBase = "", urlAppRoot} = config,
        {name: appName, version} = packageJson,
        banner = `/* Application [version: ${version}, environment: ${ENV}] */`,
        scopedNameIdentPattern = "[local]",
        babelConfig = {
            // .babelrc
            presets: [["@babel/preset-env", {
                targets: {"browsers": ["IE >= 11"]},
                modules: false
            }], "@babel/react", "@babel/typescript"],
            plugins: [
                "jsx-control-statements", "transform-react-jsx",
                "react-refresh/babel"
            ],
            cacheCompression: false,
            cacheDirectory: `node_modules/.cache/babel-loader/.${ENV}`,
            compact: false
        };

    const webpackConfig = {
        // stats: 'verbose',
        mode: "development",
        cache: {
            type: "filesystem"
        },
        optimization: {
            chunkIds: "total-size",
            moduleIds: "size"
        },
        entry: {
            bundle: [
                "@babel/polyfill",
                "./src/index.tsx"
            ]
        },
        output: {
            library: {
                name: appName,
                type: "umd"
            },
            globalObject: "window",
            publicPath: `${assetsAppBase}/`,
            filename: "[name].js"
        },
        devtool: sourceMap ? "eval-source-map" : false,
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
                filename: "index.html",
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
                    APP_VERSION: JSON.stringify(version)
                }
            })
        ]
    };

    if (ENV === "local") {

        webpackConfig.plugins.push(new ReactRefreshWebpackPlugin({
            overlay: false
        }));
    }

    return webpackConfig;
};
