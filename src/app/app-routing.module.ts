/*Angular imports */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*Component imports */
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UsersAnalysisComponent } from './users-analysis/users-analysis.component';
import {
  canActivateAdminRoutes,
  canActivateSupplierRoutes,
  canActivateCustomerRoutes,
} from './auth.guard';

const routes: Routes = [
  //accessible by everyone
  { path: 'home', component: HomeComponent },

  //accessible by customers
  {
    path: 'product/:id',
    component: ProductComponent,
    data: { requiredRoles: ['customer'] },
    canActivate: [canActivateAdminRoutes, canActivateSupplierRoutes],
  },
  //accessible by customers and admin
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { requiredRoles: ['customer', 'admin'] },
    canActivate: [canActivateSupplierRoutes],
  },
  //accessible by supplier and customer
  {
    path: 'cart',
    component: CartComponent,
    data: { requiredRoles: ['supplier', 'customer'] },
    canActivate: [canActivateAdminRoutes],
  },
  //accessible only admin
  {
    path: 'users',
    component: UsersComponent,
    data: { requiredRoles: ['admin'] },
    canActivate: [canActivateCustomerRoutes, canActivateSupplierRoutes],
  },
  //accessible by admin only
  {
    path: 'createuser',
    component: UserFormComponent,
    data: { requiredRoles: ['admin'] },
    canActivate: [canActivateCustomerRoutes, canActivateCustomerRoutes],
  },
  //accessible by admin only
  {
    path: 'edituser/:id',
    component: UserFormComponent,
    data: { requiredRoles: ['admin'] },
    canActivate: [canActivateCustomerRoutes, canActivateSupplierRoutes],
  },
  {
    path: 'user-analysis',
    component: UsersAnalysisComponent,
    data: { requiredRoles: ['admin'] },
    canActivate: [canActivateCustomerRoutes, canActivateSupplierRoutes],
  },
  //accessible by all everyone
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: SignUpComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
