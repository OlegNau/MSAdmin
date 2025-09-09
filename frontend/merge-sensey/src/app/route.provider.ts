import { RoutesService, eLayoutType } from '@abp/ng.core';
import { inject, provideAppInitializer } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  provideAppInitializer(() => {
    configureRoutes();
  })
];

function configureRoutes() {
  const routes = inject(RoutesService);
  routes.add([
    {
      path: '/',
      name: "::Menu:My projects",
      iconClass: 'fas fa-book',
      order: 1,
      layout: eLayoutType.application
    },
    {
      path: '/ai-models',
      name: '::Menu:AIModels',
      iconClass: 'fas fa-list',
      order: 2,
      layout: eLayoutType.application,
      requiredPolicy: 'MergeSensei.AiModels',
    },
  ]);
}
