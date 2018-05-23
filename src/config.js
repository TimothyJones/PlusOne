// @flow

export type FeatureFlags = {
  ScoreServer: boolean,
  StartWithOnesOnly: boolean
};

export type GeneratorConfig = {
  maxInitial: number,
  usualRange: number
};

export type Config = {
  version: string,
  providerUrl: string,
  homepage: string,
  generator: GeneratorConfig,
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
      : false,
    StartWithOnesOnly: false
  },
  generator: {
    maxInitial: 6,
    usualRange: 7
  }
};

export default config;
