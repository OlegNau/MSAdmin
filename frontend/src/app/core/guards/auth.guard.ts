import { AuthService } from "@abp/ng.core";
import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";

export const canActivateAuth: CanActivateFn = () => {
  const authService = inject(AuthService);

  if (!authService.isAuthenticated) {
    authService.navigateToLogin();

    return false;
  }

  return true;
};
