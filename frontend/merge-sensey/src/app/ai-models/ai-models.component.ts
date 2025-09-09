import { Component } from '@angular/core';
import { ListService } from '@abp/ng.core';

@Component({
  selector: 'app-ai-models',
  templateUrl: './ai-models.component.html',
  standalone: false,
  providers: [ListService]
})
export class AiModelsComponent {}
