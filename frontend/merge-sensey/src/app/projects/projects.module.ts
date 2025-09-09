import { NgModule } from '@angular/core';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatGridList, MatGridTile, MatGridTileText } from '@angular/material/grid-list';
import { CreateProjectComponent } from './create-project/create-project.component';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { ProjectsListSkeletonComponent } from './projects-list/projects-list-skeleton/projects-list-skeleton.component';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from './project-card/project-card.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectsListSkeletonComponent,
    CreateProjectComponent,
    ProjectCardComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    MatIconModule,
    MatGridList,
    MatGridTile,
    MatGridTileText,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
  ],
})
export class ProjectsModule {
}
