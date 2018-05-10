import { Pact } from '@pact-foundation/pact';
import { api } from './index.js';

describe('ScoreBoard request', () => {
  let url = 'http://localhost';
  const scoreBoard = api(`${url}:${port}`);

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
          query: 'score=12',
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
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
        .seeScore(12)
        .then(response => {
          expect(response).toEqual(EXPECTED_BODY);
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
            score: 12
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
        .then(response => {
          expect(response).toEqual(EXPECTED_BODY);
        })
        .then(done);
    });
  });
});
