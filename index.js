const http=require('http');
const unifiedServer=require('./serverConfig');

//Instantiate the http server
const httpServer=http.createServer((req,res)=>{
    unifiedServer(req,res)
})
//Start the server
httpServer.listen(3000,(err)=>{
    if(err)
    {
        throw err;
    }
    console.log("Server listening at port",3000)
})



