import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: ProjectsListComponent
      }
    ]
  },
  {
    path: ':projectId/repositories',
    loadChildren: () => import('./repository/repository.module')
      .then(m => m.RepositoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
