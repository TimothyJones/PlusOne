/* eslint-disable @typescript-eslint/no-var-requires */
import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Use require() to ensure polyfills are set before enzyme/cheerio loads
const path = require('path');
const { Pact } = require('@pact-foundation/pact');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

declare global {
  var url: string;
  var port: number;
  var provider: any;
}

(global as any).url = 'http://localhost';
(global as any).port = 8989;
(global as any).provider = new Pact({
  port: (global as any).port,
  log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  spec: 2,
  cors: true,
  pactfileWriteMode: 'update',
  consumer: 'The Plus One Game Client',
  provider: 'The Plus One Game ScoreBoard Service'
});

enzyme.configure({ adapter: new Adapter() });
