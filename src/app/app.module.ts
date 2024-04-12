/*Angular imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*Services imports */
import { UsersService } from './users.service';
import { ProductsService } from './products.service';
import { CartService } from './cart.service';
import { BadgeService } from './badge.service';

/*Component imports */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { DeleteCartDialogComponent } from './delete-cart-dialog/delete-cart-dialog.component';
import { UsersComponent } from './users/users.component';
import { SingleUserDialogComponent } from './single-user-dialog/single-user-dialog.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LoginComponent } from './login/login.component';

/* Angular Material imports */
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    HeaderComponent,
    CategoriesComponent,
    CreateProductComponent,
    DeleteConfirmationComponent,
    CartComponent,
    DeleteCartDialogComponent,
    UsersComponent,
    SingleUserDialogComponent,
    SnackBarComponent,
    UserFormComponent,
    DeleteDialogComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTableModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [UsersService, BadgeService, ProductsService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
