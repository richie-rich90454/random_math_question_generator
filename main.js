let {app, BrowserWindow}=require("electron");
let path=require("path");
let {fork}=require("child_process");
let mainWindow;
let serverProcess;
function startServer(){
    serverProcess=fork(path.join(__dirname, "server.js"), [],{
        stdio: ["pipe", "pipe", "pipe", "ipc"]
    });
    serverProcess.stdout.on("data", (data)=>{
        console.log(`Server: ${data}`);
    });
    serverProcess.stderr.on("data", (data)=>{
        console.error(`Server Error: ${data}`);
    });
    serverProcess.on("close", (code)=>{
        console.log(`Server process exited with code ${code}`);
    });
}
function createWindow(){
    mainWindow=new BrowserWindow({
        width: 1000,
        height: 800,
        icon: path.join(__dirname, "favicon.ico"),
        autoHideMenuBar: true,
        webPreferences:{
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    mainWindow.loadURL("http://localhost:1331");
    mainWindow.on("closed", ()=>{
        mainWindow=null;
    });
}
app.whenReady().then(()=>{
    startServer();
    setTimeout(()=>{
        createWindow();
    }, 1000);
    app.on("activate", ()=>{
        if (BrowserWindow.getAllWindows().length==0){
            createWindow();
        }
    });
});
app.on("window-all-closed", ()=>{
    if (process.platform!=="darwin"){
        if (serverProcess){
            serverProcess.kill();
        }
        app.quit();
    }
});
app.on("before-quit", ()=>{
    if (serverProcess){
        serverProcess.kill();
    }
});