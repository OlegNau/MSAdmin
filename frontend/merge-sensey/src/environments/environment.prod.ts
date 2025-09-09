import { Environment } from '@abp/ng.core';

const env = (window as any)['env'] || {};

const baseUrl = env.baseUrl || 'http://localhost:4200';
const issuer = env.issuer || 'https://localhost:44310/';
const apiUrl = env.apiUrl || 'https://localhost:44310';

const oAuthConfig = {
  issuer,
  redirectUri: baseUrl,
  clientId: 'MergeSensei_App',
  responseType: 'code',
  scope: 'offline_access MergeSensei',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'MergeSensei',
  },
  oAuthConfig,
  apis: {
    default: {
      url: apiUrl,
      rootNamespace: 'Nomium.MergeSensei',
    },
    AbpAccountPublic: {
      url: issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
  remoteEnv: {
    url: '/getEnvConfig',
    mergeStrategy: 'deepmerge'
  }
} as Environment;
