import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  myForm!: FormGroup;

  @Input() productData!: any;
  @Output() productUpdated = new EventEmitter<string>(); // EventEmitter for product update

  updateMode: boolean = false;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to receive product data
  ) {}

  ngOnInit(): void {
    //Initialiezes a reactive form
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      count: new FormControl('', Validators.required),
    });

    //Checks if product is in update mode - then presents the product data
    if (this.data && this.data.product) {
      this.productData = this.data.product;
      this.updateMode = true;
      this.myForm.patchValue({
        title: this.productData.title,
        price: this.productData.price,
        description: this.productData.description,
        category: this.productData.category,
        image: this.productData.image,
        rate: this.productData.rating.rate,
        count: this.productData.rating.count,
      });
    }
  }

  onSubmit(myForm: any) {
    console.log(myForm);
    const filteredData = Object.fromEntries(
      Object.entries(myForm.value).filter(
        ([key]) => !['rate', 'count'].includes(key)
      )
    );
    const formData = {
      ...filteredData,
      rating: {
        rate: myForm.value.rate,
        count: myForm.value.count,
      },
    };

    if (this.updateMode && myForm.valid && myForm.touched) {
      this.productService
        .updateProduct(this.productData.id, formData)
        .subscribe((data) => {
          // Emit 'updated' event upon successful update
          this.productUpdated.emit('updated');
        });
    } else if (!this.updateMode && myForm.valid) {
      // Extract category value from the form
      const category = myForm.value.category;
      
      this.productService.createProduct(formData, category).subscribe((data) => data);
      this.snackBar.open('Product created successfully', 'Close', {
        duration: 5000,
      });
    }
    this.myForm.reset();
    this.dialogRef.close();
  }
}
