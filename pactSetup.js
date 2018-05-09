const path = require('path');
const { Pact } = require('@pact-foundation/pact');

global.port = 8989;
global.provider = new Pact({
  port: global.port,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'The Plus One Game Client',
  provider: 'The Plus One Game ScoreBoard Service'
});
