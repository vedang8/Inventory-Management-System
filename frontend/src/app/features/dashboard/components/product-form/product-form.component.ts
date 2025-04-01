import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../shared/services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Product } from '../../../../shared/models/product.model';
import { MatError, MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories = ['Electronics', 'Clothing', 'Books', 'Furniture']; // Sample categories
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productForm = this.fb.group({
      product_name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      supplier_name: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.productForm.patchValue(this.data);
      console.log('Form value on init:', this.productForm.value);
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