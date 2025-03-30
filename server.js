const http=require("http");
const fs=require("fs");
const path=require("path");
const express=require("express");
const crypto=require("crypto");
const helmet=require("helmet");
const rateLimit=require("express-rate-limit");
const morgan=require("express");
const app=express();
const port=1331;
const server=http.createServer((req, res)=>{
    let filePath="." + req.url;
    if (filePath=="./"){
        filePath="./index.html";
    }
    if (filePath=="./quotes_of_the_day.txt"){
        filePath="./quotes_of_the_day.txt";
    }
    const extname=path.extname(filePath).toLowerCase();
    const mimeTypes={
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".txt": "text/plain; charset=utf-8",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".ogg": "audio/ogg",
        ".flac": "audio/flac",
    };
    const contentType=mimeTypes[extname]||"application/octet-stream";
    fs.readFile(filePath, (err, content)=>{
        if (err){
            if (err.code=="ENOENT"){
                res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
                res.end("<h1>404 Not Found</h1>", "utf-8");
            }
            else{
                res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                res.end(`Server error: ${err.message}`, "utf-8");
            }
        }
        else{
            res.writeHead(200,{
                "Content-Type": contentType,
                "Cache-Control": "no-cache, no-store, must-revalidate",
            });
            res.end(content);
        }
    });
});

server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});