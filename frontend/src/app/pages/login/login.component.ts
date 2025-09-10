import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@abp/ng.core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loggingIn = signal(false);
  private returnUrl = '/';

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap;
    this.returnUrl = q.get('returnUrl') || '/';
    if (this.auth.isAuthenticated) this.router.navigateByUrl(this.returnUrl);
  }

  login(): void {
    this.loggingIn.set(true);
    try {
      this.auth.navigateToLogin();
    } finally {
      this.loggingIn.set(false);
    }
  }
}
