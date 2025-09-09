import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { AiModelService } from '../../proxy/ai-models';
import { AiModelDto } from '../../proxy/ai-models/dtos';

@Component({
  selector: 'app-ai-models-list',
  templateUrl: './ai-models-list.component.html',
  standalone: false,
  styleUrl: './ai-models-list.component.scss'
})
export class AiModelsListComponent
  implements OnInit, OnDestroy {
  private readonly aiModelService = inject(AiModelService);

  public displayedColumns: string[] = ['name', 'vendor', 'actions'];
  public dataSource = new MatTableDataSource<AiModelDto>();

  private readonly subscriptionsDestroy$: Subject<boolean> = new Subject<boolean>();

  public ngOnInit(): void {
    this.aiModelService.getList({ maxResultCount: 50 })
      .pipe(takeUntil(this.subscriptionsDestroy$))
      .subscribe({
        next: (result) => {
          this.dataSource.data = result.items;
        }
      });
  }

  public ngOnDestroy(): void {
    this.subscriptionsDestroy$.next(true);
  }
}
