import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { tap } from 'rxjs';
import { AuthPermissionService } from '../services/auth-permission.service';

export const tasksGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const permissionService = inject(AuthPermissionService);
  return permissionService.isGranted().pipe(
    tap((isGranted) => {
      if (!isGranted) {
        router.navigate(['/login']);
      }
    })
  );
};
