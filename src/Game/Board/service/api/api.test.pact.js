import { Pact, Matchers } from '@pact-foundation/pact';
import api from './index.js';

const { like, integer } = Matchers;

describe('ScoreBoard request', () => {
  const scoreBoard = api(
    `${url}:${port}`,
    '6fefe750-07b5-4d8f-b30f-6264372ef54e'
  );

  const EXPECTED_BODY = {
    timesReached: 10
  };

  describe('listing scores', () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'a request to see scores for a number',
        withRequest: {
          method: 'GET',
          path: '/scoreboard',
          query: {
            score: '12',
            u: '6fefe750-07b5-4d8f-b30f-6264372ef54e'
          },
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            timesReached: like(EXPECTED_BODY.timesReached)
          }
        }
      };
      return provider.addInteraction(interaction);
    });

    // add expectations
    it('returns the number of times this score has been reached', done => {
      scoreBoard
        .seeScore(12)
        .then(score => {
          expect(score).toEqual(EXPECTED_BODY.timesReached);
        })
        .then(done);
    });
  });

  describe('posting new scores', () => {
    beforeEach(() => {
      const interaction = {
        uponReceiving: 'a newly submitted score',
        withRequest: {
          method: 'POST',
          path: '/scoreboard',
          headers: {
            Accept: 'application/json'
          },
          body: {
            score: 12,
            u: '6fefe750-07b5-4d8f-b30f-6264372ef54e'
          }
        },
        willRespondWith: {
          status: 201,
          headers: {
            'Content-Type': 'application/json'
          },
          body: EXPECTED_BODY
        }
      };
      return provider.addInteraction(interaction);
    });

    // add expectations
    it('returns the number of times this score has been reached', done => {
      scoreBoard
        .finalScore(12)
        .then(score => {
          expect(score).toEqual(EXPECTED_BODY.timesReached);
        })
        .then(done);
    });
  });
});
