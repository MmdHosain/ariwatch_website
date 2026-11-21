import { createApp } from './app';
import { initDb, pool } from '../infrastructure/database/postgres';
import { startIntegrationWorkers } from '../infrastructure/integrations/startWorkers';

async function start() {
  await initDb();
  const app = createApp();
  const stopWorkers = startIntegrationWorkers(app.locals.integrations, app.locals.notifications);
  const host = process.env.HOST || '0.0.0.0';
  const port = Number(process.env.PORT || 4000);
  const server = app.listen(port, host, () => {
    console.log(`Watch shop API is ready on http://${host}:${port} (${process.env.NODE_ENV || 'development'})`);
  });
  let closing = false;
  const shutdown = (signal: string) => {
    if (closing) return;
    closing = true;
    console.log(`Received ${signal}; shutting down gracefully...`);
    stopWorkers();
    const forceExit = setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10_000);
    forceExit.unref();
    server.close(() => {
      pool.end().finally(() => process.exit(0));
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start().catch(async error => {
  console.error('Database startup failed:', error.message);
  await pool.end();
  process.exitCode = 1;
});
