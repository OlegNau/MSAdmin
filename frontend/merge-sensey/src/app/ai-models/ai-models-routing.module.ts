import { inject, NgModule } from '@angular/core';
import { CanActivateFn, RouterModule, Routes } from '@angular/router';
import { AiModelsListComponent } from './ai-models-list/ai-models-list.component';
import { PermissionService } from '@abp/ng.core';

export const canAccessAiModels: CanActivateFn = () => {
  const permission = inject(PermissionService);
  return permission.getGrantedPolicy('MergeSensei.AiModels');
};

export const canCreateAiModels: CanActivateFn = () => {
  const permission = inject(PermissionService);
  return permission.getGrantedPolicy('MergeSensei.AiModels.Create');
};

const routes: Routes = [
  {
    path: '',
    canActivate: [canAccessAiModels],
    data: { requiredPolicy: 'MergeSensei.AiModels' },
    component: AiModelsListComponent
  },
  {
    path: 'list',
    canActivate: [canAccessAiModels],
    data: { requiredPolicy: 'MergeSensei.AiModels.Create' },
    component: AiModelsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AiModelsRoutingModule {
}
