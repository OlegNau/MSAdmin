import { Environment } from '@abp/ng.core';


const baseUrl = 'http://localhost:4200';

const oAuthConfig = {
  issuer: 'https://localhost:44310/',
  redirectUri: baseUrl,
  clientId: 'MergeSensei_App',
  responseType: 'code',
  scope: 'offline_access MergeSensei',
  requireHttps: true,
};

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'MergeSensei',
  },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44310',
      rootNamespace: 'Nomium.MergeSensei',
    },
    AbpAccountPublic: {
      url: oAuthConfig.issuer,
      rootNamespace: 'AbpAccountPublic',
    },
  },
} as Environment;
