const {
    urlAppRoot,
    assetsAppBase,
    routerBasename,
    dbBaseUrl
} = require(`./env.${process.env.CONFIG_ENV}.json`);

export {
    urlAppRoot,
    assetsAppBase,
    routerBasename,
    dbBaseUrl
};