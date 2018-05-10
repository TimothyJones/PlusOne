// @flow
import fetch from 'cross-fetch';

const apiPost = (hostAndPort: string, query: string, body: any) =>
  fetchWith(`${hostAndPort}/${query}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

const apiGet = (hostAndPort: string, query: string, body: any) =>
  fetchWith(`${hostAndPort}/${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });

const fetchWith = (url: string, options: any) =>
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

export default (hostAndPort: string = 'localhost:8123', userId: string) => ({
  finalScore: (score: number) =>
    apiPost(hostAndPort, 'scoreboard', { score, u: userId }),
  seeScore: (score: number) =>
    apiGet(hostAndPort, `scoreboard?score=${score}&u=${userId}`)
});
