import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {

  myForm!: FormGroup;

  @Input() productData!: any;

  updateMode: boolean = false;

  constructor(
    private productService: ProductsService,
    private router: Router,
    public dialogRef: MatDialogRef<CreateProductComponent>
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    });
  }

  onSubmit(myForm: any) {
    if (this.updateMode && myForm.valid) {
      console.log(myForm.value);
      console.log(this.productData.id);
      this.productService
        .updateProduct(this.productData.id, myForm.value)
        .subscribe((data) => data);
    } else if (!this.updateMode && myForm.valid) {
      console.log(myForm.value);
      this.productService.createProduct(myForm.value).subscribe((data) => data);
    }
    this.myForm.reset();
    this.dialogRef.close();
  }
}
