import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectDto } from '../../proxy/projects/dtos';

@Component({
  selector: 'app-create-project',
  standalone: false,
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, width: '50vw' }
    }
  ]
})
export class CreateProjectComponent {
  private readonly formBuilder = inject(FormBuilder);
  protected readonly data: ProjectDto = inject<ProjectDto>(MAT_DIALOG_DATA);

  public readonly createProjectForm = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control(this.data?.name ?? '', [Validators.required]),
    description: this.formBuilder.nonNullable.control(this.data?.description ?? '', [Validators.required]),
    gitAccessToken: this.formBuilder.nonNullable.control(this.data?.gitAccessToken ?? '', [Validators.required]),
  })

  public createProject() {
    if (this.createProjectForm.valid) {
      return {
        ...this.createProjectForm.value
      }
    }
  }
}
