import express from "express";
const expressStatic = express.static;
import { pdf } from "pdf-to-img";
import { readdir, unlink, writeFileSync } from "fs";
import { join } from "path";
const app=express();
app.use(expressStatic(__dirname));
app.get("/pdf-to-img",async(req,res)=>{
    const pdfPath=join(__dirname,"test.pdf");
    const imagesDir="./images";
    readdir(imagesDir,(err,files)=>{
        if(err) throw err;
        for (const file of files){
            unlink(join(imagesDir,file),err =>{
                if(err) throw err;
            });
        }
    }) ;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    let pageNumber=1;
    for await(const page of await pdf(pdfPath)){
        writeFileSync(`./images/page${pageNumber}.png`,page);
        res.write(`event: generatedpages\ndata: ${pageNumber}\n\n`);
        pageNumber++;
    }
    res.write(`event: totalpages\ndata: ${pageNumber}\n\n`);
    res.end();
});
app.use(`/images`,expressStatic(join(__dirname,"images")));
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});