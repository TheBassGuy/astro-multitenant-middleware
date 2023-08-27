import { defineMiddleware } from "astro/middleware";

// const regex = /.([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,5})?(\.[a-zA-Z]+$)/gm;

export const onRequest = defineMiddleware(async (context, next) => {
    if(context.url.host === "localhost"){
        return next()
    } else if(context.url.host === "app.localhost" && !context.request.headers.get("X-Astro-Rewrite")){
        const path = context.url.pathname
        const hostname = context.request.headers.get("host")!.replace("localhost", "mydomain.com")
        
        const response = await fetch(`http://localhost/${hostname}${path}`, {
            headers : {
                "X-Astro-Rewrite" : "true"
            }
        })
        if(response.ok){
            return response
        }
    }
    return new Response("404")
});