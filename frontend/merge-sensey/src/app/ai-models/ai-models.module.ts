import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { AiModelsListComponent } from './ai-models-list/ai-models-list.component';
import { AiModelsRoutingModule } from './ai-models-routing.module';
import { AiModelsComponent } from './ai-models.component';
import { LocalizationModule } from '@abp/ng.core';

@NgModule({
  declarations: [
    AiModelsComponent,
    AiModelsListComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    AiModelsRoutingModule,
    LocalizationModule,
  ]
})
export class AiModelsModule {
}
