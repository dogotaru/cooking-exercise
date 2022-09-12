const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../scripts/webpack.local.config")({}, {});

const
    protocol = process.env.npm_package_config_webpackDevServer_protocol,
    domain = process.env.npm_package_config_webpackDevServer_domain,
    port = process.env.npm_package_config_webpackDevServer_port,
    hostname = process.env.npm_package_config_webpackDevServer_hostname;

let clientURL = `${protocol}://${hostname}.${domain}:${port}`;

if ({}.hasOwnProperty.call(config, "optimization"))
    config.optimization.moduleIds = "named";

new WebpackDevServer({
    client: {
        webSocketURL: `${config.output.publicPath.replace(`${protocol}:`, "auto:")}ws`,
        overlay: false
    },
    hot: true,
    historyApiFallback: {
        index: config.output.publicPath
    },
    headers: {
        // 'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict',
        "Access-Control-Allow-Origin": "*"
    },
    liveReload: false,
    allowedHosts: [
        `.${domain}`
    ]
}, webpack(config)).start(port, `${hostname}.${domain}`, function(err, result) {
    if (err) {
        return console.log(err);
    }
    console.log("Listening at: " + clientURL + " [ CTRL + url ]");
});