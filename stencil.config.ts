import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  copy: [
    { src: '_redirects' },
    { src: 'env-config.json' }
  ],
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      // uncomment the following line to disable service workers in production
      // serviceWorker: null
    }
  ]
};
