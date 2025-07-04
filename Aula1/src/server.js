import http from "node:http";
// import { buffer, json } from "node:stream/consumers";
import { json } from './middlewares/json.js';
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";
// import { SourceTextModule } from "node:vm";
// import { stdout } from "node:process";


// const database = new database()

const server = http.createServer(async(req, res) => {
    const {method, url} = req

    await json(req,res)


    const route = routes.find(route => {
        return route.method === method && route.path.test(url)

    })

    if (route) {
        const routeParams = req.url.match(route.path)
    
        console.log(extractQueryParams(routeParams.groups.query))

        const { query, ...params } = routeParams.groups
    
        req.params = params

        req.query = query ? extractQueryParams(query) : {}
    
        return route.handler(req, res)
      }
    
      return res.writeHead(404).end()
    })

server.listen(3333)