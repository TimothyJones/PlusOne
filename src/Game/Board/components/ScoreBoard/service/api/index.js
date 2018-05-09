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
  fetch(url, options).then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      var error = new Error(
        response.statusText + JSON.stringify(response.json())
      );
      throw error;
    }
  });

export const api = (hostAndPort: string = 'localhost:8123') => ({
  finalScore: (score: number) => apiPost(hostAndPort, 'scoreboard', { score }),
  seeScore: (score: number) => apiGet(hostAndPort, `scoreboard?score=${score}`)
});
