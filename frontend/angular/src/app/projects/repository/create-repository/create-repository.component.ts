import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-repository',
  standalone: false,
  templateUrl: './create-repository.component.html',
  styleUrl: './create-repository.component.scss',
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: true, width: '50vw' }
    }
  ]
})
export class CreateRepositoryComponent {
  private readonly formBuilder = inject(FormBuilder);

  public readonly createRepositoryForm = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', [Validators.required]),
    url: this.formBuilder.nonNullable.control('', [Validators.required]),
    webhookUrl: this.formBuilder.nonNullable.control('', [Validators.required]),
  });

  public createRepository() {
    if (this.createRepositoryForm.valid) {
      return {
        ...this.createRepositoryForm.value
      }
    }
  }
}
