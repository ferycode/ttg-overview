'use strict';

global.__base = global.__base || __dirname + '/';
const envoodoo = require('envoodoo');

envoodoo(e => {
  if (e) throw e;
  const express = require('express');
  const db = require('./app/models');
  const log = require('./lib/winston/logger');
  const requestLogger = require('./lib/middleware/request-logger');
  const errorHandler = require('./lib/middleware/error-handler');

  const app = express();
  const cors = require('cors');
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cors());
  app.use(requestLogger);

  // Initialize database connection
  async function initConnections() {
    try {
      // MySQL
      await db.sequelize.authenticate();
      log.info('MySQL successfully connected');
    } catch (error) {
      log.error('Unable to connect to the databases:', error);
    }
  }

  initConnections();

  // API Routes
  require('./app/controllers')(app);

  app.get('/', (req, res) => {
    res.json({ 
      message: 'Backend User API',
      version: '1.0.0',
      author: 'Fery Dedi Supardi',
    });
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`);
  });
});
