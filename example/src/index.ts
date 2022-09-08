import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import { Adapter } from 'adminjs-mysql';
import { initDb } from './initDb';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './consts';

async function bootstrap() {
  await initDb();
  const app = express();
  AdminJS.registerAdapter(Adapter);
  const database = await Adapter.database({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  const adminJs = new AdminJS({
    databases: [database],
    resources: [...database.tables()],
    rootPath: '/',
  });

  const router = AdminJSExpress.buildRouter(adminJs);
  app.use(adminJs.options.rootPath, router);
  app.listen(33300, () =>
    console.log('adminjs-mysql example app is under http://localhost:33300')
  );
}

bootstrap();
