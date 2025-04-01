import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../shared/services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories = ['Electronics', 'Clothing', 'Books', 'Furniture']; // Sample categories
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notification: NotificationService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      supplierName: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.productForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.isEdit) {
        this.productService.updateProduct(this.data.id!, product).subscribe({
          next: () => {
            this.notification.showSuccess('Product updated successfully');
            this.dialogRef.close(true);
          },
          error: (err) => this.notification.showError(err.message)
        });
      } else {
        this.productService.addProduct(product).subscribe({
          next: () => {
            this.notification.showSuccess('Product added successfully');
            this.dialogRef.close(true);
          },
          error: (err) => this.notification.showError(err.message)
        });
      }
    }
  }
}