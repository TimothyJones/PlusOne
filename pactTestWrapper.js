jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

beforeAll(() => provider.setup());
afterEach(() => provider.verify());
afterAll(() => provider.finalize());
