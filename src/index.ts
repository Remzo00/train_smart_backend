import { HttpServer, port } from './adapters/inbound/http.server';
import 'dotenv/config';
import { config } from './infrastructure/config/config';


config().then(() => {
  console.log('Connected to the database');
  HttpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})
 

