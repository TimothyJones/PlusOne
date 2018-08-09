import { Matchers } from '@pact-foundation/pact';
import api from './index';

/* global url port provider */

const { like } = Matchers;

describe('ScoreBoard request', () => {
  const scoreBoard = api(
    `${url}:${port}`,
    '6fefe750-07b5-4d8f-b30f-6264372ef54e'
  );

  const EXPECTED_BODY = {
    timesReached: 10,
    globalHighScore: 12
  };

  describe('posting new scores', () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'a newly submitted score',
        withRequest: {
          method: 'POST',
          path: '/scoreboard',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: {
            score: 12,
            u: '6fefe750-07b5-4d8f-b30f-6264372ef54e'
          }
        },
        willRespondWith: {
          status: 201,
          body: like(EXPECTED_BODY)
        }
      };
      return provider.addInteraction(interaction);
    });

    // add expectations
    it('returns the number of times this score has been reached', done => {
      scoreBoard
        .reachedScore(12)
        .then(({ reachedBy, globalHighScore }) => {
          expect(reachedBy).toEqual(EXPECTED_BODY.timesReached);
          expect(globalHighScore).toEqual(EXPECTED_BODY.globalHighScore);
        })
        .then(done);
    });
  });
});
