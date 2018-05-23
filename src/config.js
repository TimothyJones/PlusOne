// @flow

export type FeatureFlags = {
  ScoreServer: boolean
};

export type Config = {
  version: string,
  providerUrl: string,
  homepage: string,
  features: FeatureFlags
};

const config: Config = {
  version: process.env.APP_VERSION
    ? process.env.APP_VERSION
    : 'Unknown Version',
  providerUrl: process.env.PROVIDER_URL
    ? process.env.PROVIDER_URL
    : 'http://localhost:8182',
  homepage: process.env.HOMEPAGE
    ? process.env.HOMEPAGE
    : 'http://timothyjones.github.io/PlusOne',
  features: {
    ScoreServer: process.env.SCORE_SERVER
      ? Boolean(process.env.SCORE_SERVER)
      : false
  }
};

export default config;
