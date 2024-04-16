import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

export const canActivateAdminRoutes = () => {
  const router = inject(Router);
  if (window.localStorage.getItem('role') === 'admin') {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
export const canActivateSupplierRoutes = () => {
  const router = inject(Router);
  if (window.localStorage.getItem('role') === 'supplier') {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
export const canActivateCustomerRoutes = () => {
  const router = inject(Router);
  if (window.localStorage.getItem('role') === 'supplier') {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
