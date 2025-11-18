import { fastify } from "fastify" 
import cors from "@fastify/cors"



const app = fastify ();

app.register( cors, {
    origin: "*"
})

app.get('/', () =>{
    return 'ola mundo'
})

app.listen({
    port: 3333
}).then(() =>{
    console.log('testet')
})
