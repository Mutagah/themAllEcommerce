/*Angular imports */
import { NgModule } from '@angular/core';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*Services imports */
import { CartService } from './cart.service';
import { BadgeService } from './badge.service';
import { UsersService } from './users.service';
import { ProductsService } from './products.service';

/*Component imports */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProductComponent } from './product/product.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { CategoriesComponent } from './categories/categories.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UsersAnalysisComponent } from './users-analysis/users-analysis.component';
import { SingleUserDialogComponent } from './single-user-dialog/single-user-dialog.component';
import { DeleteCartDialogComponent } from './delete-cart-dialog/delete-cart-dialog.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

/* Angular Material imports */
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    SignUpComponent,
    UsersAnalysisComponent,
    AnalyticsComponent,
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
    MatMenuModule,
  ],
  providers: [UsersService, BadgeService, ProductsService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
