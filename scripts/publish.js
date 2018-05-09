let publisher = require('@pact-foundation/pact-node');
let path = require('path');
let pack = require('../package.json')

let opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: process.env.PACT_BROKER_HOST,
  pactBrokerUsername: process.env.PACT_BROKER_USERNAME,
  pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
  consumerVersion: pack.version
};

publisher.publishPacts(opts).then(() => done());
