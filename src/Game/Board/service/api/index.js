// @flow
import fetch from 'cross-fetch';

type WireScoreDefinition = {
  timesReached: number,
  globalHighScore: number
};

type WireScoreError = {
  error: string
};

type WireScoreResponse = WireScoreDefinition | WireScoreError;

export type ScoreBoardFromServer = {
  reachedBy: number,
  globalHighScore: ?number
};

const fetchWith = (url: string, options: any): Promise<WireScoreResponse> =>
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return {
        error: response.statusText + JSON.stringify(response.json())
      };
    })
    .catch(reason => ({
      error: reason
    }));

const apiPost = (
  hostAndPort: string,
  query: string,
  body: any
): Promise<WireScoreResponse> =>
  fetchWith(`${hostAndPort}/${query}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

const handleResponse = (response: WireScoreResponse): ?ScoreBoardFromServer => {
  if (typeof response.error === 'string') {
    console.error(`Unable to reach ScoreBoard due to ${response.error}`);
  }
  return response.timesReached !== undefined
    ? {
        reachedBy: Number(response.timesReached),
        globalHighScore: response.globalHighScore
          ? Number(response.globalHighScore)
          : undefined
      }
    : undefined;
};

export default (hostAndPort: string, userId: string) => ({
  reachedScore: (score: number): Promise<?ScoreBoardFromServer> =>
    apiPost(hostAndPort, 'scoreboard', { score, u: userId }).then(
      handleResponse
    )
});
