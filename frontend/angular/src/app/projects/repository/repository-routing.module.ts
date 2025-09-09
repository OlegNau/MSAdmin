import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositoriesListComponent } from './repositories-list/repositories-list.component';
import { RepositoryComponent } from './repository.component';

const routes: Routes = [
  {
    path: '',
    component: RepositoryComponent,
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: RepositoriesListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule { }
