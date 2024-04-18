import { inject } from '@angular/core';
import { Router } from '@angular/router';

/*Component imports */
import { SnackBarComponent } from './snack-bar/snack-bar.component';

/*Angular Material */
import { MatSnackBar } from '@angular/material/snack-bar';

export const canActivateAdminRoutes = () => {
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  if (window.localStorage.getItem('role') === 'admin') {
    router.navigate(['/home']);
    snackbar.openFromComponent(SnackBarComponent, {
      data: {
        message: 'Access to route denied',
      },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    return false;
  } else {
    return true;
  }
};
export const canActivateSupplierRoutes = () => {
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  if (window.localStorage.getItem('role') === 'supplier') {
    router.navigate(['/home']);
    snackbar.openFromComponent(SnackBarComponent, {
      data: {
        message: 'Access to route denied',
      },
    });
    return false;
  } else {
    return true;
  }
};
export const canActivateCustomerRoutes = () => {
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  if (window.localStorage.getItem('role') === 'supplier') {
    router.navigate(['/home']);
    snackbar.openFromComponent(SnackBarComponent, {
      data: {
        message: 'Access to route denied',
      },
    });
    return false;
  } else {
    return true;
  }
};
