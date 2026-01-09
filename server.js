let fastify=require("fastify")();
let port=1331;
let isProduction=process.env.NODE_ENV=="production";
let staticRoot=isProduction?require("path").join(__dirname, "dist"):__dirname;
fastify.addHook("onSend", (request, reply, payload, done)=>{
    reply.header("Cache-Control", "no-cache, no-store, must-revalidate");
    done();
});
fastify.register(require("@fastify/static"),{
    root: staticRoot,
});
fastify.setNotFoundHandler((request, reply)=>{
    reply.code(404).type("text/html").send("<h1>404 Not Found</h1>");
});
fastify.setErrorHandler((error, request, reply)=>{
    reply.code(500).type("text/plain").send(`Server error: ${error.message}`);
});
fastify.listen(
    {
        port: port,
        host: "::",
    },
    (err)=>{
        if (err){
            console.error(err);
            process.exit(1);
        }
        console.log(`Server running at http://localhost:${port}`);
    }
);