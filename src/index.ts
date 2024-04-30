import { HttpServer, port } from './adapters/inbound/http.server';
import { config } from './infrastructure/config/config';

config().then(() => {
  HttpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
 

