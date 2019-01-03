/**
 * This file is used to define server configurations
 * 
 * 
 * 
 */


const url=require('url');
const stringDecoder=require('string_decoder').StringDecoder;
const handler=require('./routerConfig');
var serverConfig=(req,res)=>
{
 //get header
 const headers=req.headers
 //get url 
const parsedUrl=url.parse(req.url,true)

//get path
const path=parsedUrl.pathname
const trimmedPath=path.replace(/^\/+|\/$/g,'')
// method
const method=req.method.toLowerCase();
//get payload
var decoder=new stringDecoder('utf-8');
var buffer='';
req.on('data',(data)=>{
 buffer+=decoder.write(data)
})
req.on('end',()=>{
     buffer+=decoder.end()
     //choose handler.if not found then use not found handler
     var choosenHandler=typeof(handler.routerConfig[trimmedPath])!=='undefined'?handler.routerConfig[trimmedPath]:handler.notFound
     var data={}
     choosenHandler(data,(statusCode,payload)=>{
         statusCode=typeof(statusCode)=='number'?statusCode:404;
         if(statusCode==200)
         {
             data={
                 'serverMessage':'Hello Welcome',
                 'statusCode':statusCode,
                 'method':method.toUpperCase(),
                 'headers':headers,
                 'payloadSent':buffer
             }
         }
         else
         {
             data={
                 'serverMessage':'Not Found',
                 'statusCode':statusCode,
                 'method':method.toUpperCase(),
                 'headers':headers,
                 'payloadSent':buffer
             }
         }
         const result=JSON.stringify(data)    
         res.setHeader('Content-type','application/json')
         res.end(result)
     })
 })
}

module.exports=serverConfig