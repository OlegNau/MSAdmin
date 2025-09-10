import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from "@abp/ng.core";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  @Output() public menuToggle = new EventEmitter<void>();

  public search = '';

  public onMenuClick(): void {
    this.menuToggle.emit();
  }

  private readonly auth = inject(AuthService);

  AuthServicelogout(): void {
    this.auth.logout();
  }
}

