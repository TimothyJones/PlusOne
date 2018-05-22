// @flow
import fetch from 'cross-fetch';

type ScoreDefinition = {
  timesReached: number
};

type ScoreError = {
  error: string
};

type ScoreResponse = ScoreDefinition | ScoreError;

const apiPost = (
  hostAndPort: string,
  query: string,
  body: any
): Promise<ScoreResponse> =>
  fetchWith(`${hostAndPort}/${query}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

const apiGet = (
  hostAndPort: string,
  query: string,
  body: any
): Promise<ScoreResponse> =>
  fetchWith(`${hostAndPort}/${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

const fetchWith = (url: string, options: any): Promise<ScoreResponse> =>
  fetch(url, options)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        return {
          error: response.statusText + JSON.stringify(response.json())
        };
      }
    })
    .catch(reason => ({
      error: reason
    }));

const handleResponse = (response: ScoreResponse) => {
  if (typeof response.error === 'string') {
    console.log(`Unable to reach ScoreBoard due to ${response.error}`);
  }
  return response.timesReached !== undefined
    ? Number(response.timesReached)
    : undefined;
};

export default (hostAndPort: string, userId: string) => ({
  finalScore: (score: number): Promise<?number> =>
    apiPost(hostAndPort, 'scoreboard', { score, u: userId }).then(
      handleResponse
    ),
  seeScore: (score: number): Promise<?number> =>
    apiGet(hostAndPort, `scoreboard?score=${score}&u=${userId}`).then(
      handleResponse
    )
});
