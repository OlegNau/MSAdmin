import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "@abp/ng.account";
import { canActivateAuth } from "./core/guards/auth.guard";
import { LayoutComponent } from "./shared/components/layout/layout.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [canActivateAuth],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'projects'
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module')
          .then(m => m.ProjectsModule)
      },
      {
        path: 'account',
        loadChildren: () => import('@abp/ng.account')
          .then(m => m.AccountModule.forLazy())
      },
      {
        path: 'identity',
        loadChildren: () => import('@abp/ng.identity')
          .then(m => m.IdentityModule.forLazy())
      },
      {
        path: 'tenant-management',
        loadChildren: () =>
          import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy())
      },
      {
        path: 'setting-management',
        loadChildren: () =>
          import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy())
      },
      {
        path: 'ai-models',
        loadChildren: () => import('./ai-models/ai-models.module')
          .then(m => m.AiModelsModule)
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
