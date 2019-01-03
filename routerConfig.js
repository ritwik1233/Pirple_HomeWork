/**
 * This file is used to define the route handlers
 * and also the various router
 * 
 */

var handler={}
handler.hello=(data,callback)=>{
    callback(200,data)
}
handler.notFound=(data,callback)=>{
    callback(404)
}

handler.routerConfig={
    'hello':handler.hello

}
module.exports=handler
