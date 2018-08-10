const pact = require('@pact-foundation/pact-node');
const path = require('path');
const gitRevision = require('git-revision-webpack-plugin');

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: process.env.PACT_BROKER_HOST,
  pactBrokerUsername: process.env.PACT_BROKER_USERNAME,
  pactBrokerPassword: process.env.PACT_BROKER_PASSWORD,
  consumerVersion: new gitRevision().version()
};

pact.publishPacts(opts);
