import { Component, inject, OnInit } from '@angular/core';
import { ListService } from '@abp/ng.core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProjectService } from '../../proxy/projects';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss',
  standalone: false,
  providers: [ListService]
})
export class RepositoryComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly currentProject$ = this.activatedRoute.params.pipe(
    switchMap((params) =>
      this.projectService.get(params['projectId'])
    )
  );

  public ngOnInit() {
    console.log('test');
    console.log(this.activatedRoute.snapshot.params['projectId']);
  }

}
