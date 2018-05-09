jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

beforeAll(done => {
  provider.setup().then(() => done());
});

afterAll(done => {
  provider
    .finalize()
    .then(provider.verify)
    .then(done);
});
