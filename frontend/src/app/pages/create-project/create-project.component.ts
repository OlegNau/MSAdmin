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
import type { CreateProjectForm } from './models/create-project.model';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);

  public readonly form = this.fb.nonNullable.group<CreateProjectForm>({
    name: ['', Validators.required],
    description: [''],
    gitAccessToken: ['', Validators.required],
  });

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description, gitAccessToken } = this.form.value;

    this.projectService
      .create({ name, description, gitAccessToken })
      .subscribe(project => this.router.navigate(['/projects', project.id]));
  }

  public cancel(): void {
    this.router.navigate(['/projects']);
  }
}
