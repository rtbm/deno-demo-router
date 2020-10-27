import { serve } from "https://deno.land/std@0.75.0/http/server.ts";
import { Router } from './router.ts';

const server = serve({ hostname: "0.0.0.0", port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

const router = new Router();

router.get('/', req => req.respond({ status: 200, body: 'Hello world' }));
router.get('/deno', req => req.respond({ status: 200, body: 'Hello deno' }));

for await (const request of server) {
  router.handleRoute(request);
}
