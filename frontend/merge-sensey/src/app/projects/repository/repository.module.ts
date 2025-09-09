import { NgModule } from '@angular/core';

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryComponent } from './repository.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { SharedModule } from '../../shared/shared.module';
import { RepositoriesListComponent } from './repositories-list/repositories-list.component';
import { CreateRepositoryComponent } from './create-repository/create-repository.component';
import {
  RepositoriesListSkeletonComponent,
} from './repositories-list/repositories-list-skeleton/repositories-list-skeleton.component';


@NgModule({
  declarations: [
    RepositoryComponent,
    RepositoriesListComponent,
    CreateRepositoryComponent,
    RepositoriesListSkeletonComponent,
  ],
  imports: [
    RepositoryRoutingModule,
    SharedModule,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatInput,
    MatSlideToggle,
  ],
})
export class RepositoryModule {
}
