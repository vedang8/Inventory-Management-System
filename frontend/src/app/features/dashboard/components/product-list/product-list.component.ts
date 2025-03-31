import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Product } from '../../../../shared/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() categoryFilter: string = '';
  displayedColumns: string[] = ['product_name', 'quantity', 'price', 'supplier_name', 'category', 'actions'];
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilter();
      },
      error: (err) => this.notification.showError(err.message)
    });
  }

  applyFilter(): void {
    this.filteredProducts = this.categoryFilter
      ? this.products.filter(p => p.category === this.categoryFilter)
      : [...this.products];
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.notification.showSuccess('Product deleted successfully');
          this.loadProducts();
        },
        error: (err) => this.notification.showError(err.message)
      });
    }
  }

  getLowStock(): void {
    this.productService.getLowStockProducts().subscribe({
      next: (products) => {
        this.filteredProducts = products;
      },
      error: (err: any) => this.notification.showError(err.message)
    });
  }
}