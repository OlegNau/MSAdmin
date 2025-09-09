import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../proxy/projects/project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectComponent {
  // TODO: i18n
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);

  public readonly form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    repository: [''],
    defaultBranch: [''],
    visibility: ['private'],
  });

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.projectService
      .create({
        name: this.form.value.name ?? '',
        description: this.form.value.description ?? '',
      })
      .subscribe(() => this.router.navigate(['/projects']));
  }

  public cancel(): void {
    this.router.navigate(['/projects']);
  }
}
