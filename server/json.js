const
    jsonServer = require('json-server'),
    fs = require("fs"),
    packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"))

const
    protocol = packageJson.config.jsonServer.protocol,
    db = packageJson.config.jsonServer.db,
    domain = packageJson.config.jsonServer.domain,
    port = packageJson.config.jsonServer.port,
    hostname = packageJson.config.jsonServer.hostname,
    host = `${protocol}://${hostname}.${domain}`;

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults({
    port, host, "watch": true
})

server.use(middlewares)
server.use(router)
server.listen(port, () => {
    console.log(`JSON Server is running at: ${host}:${port}`)
})