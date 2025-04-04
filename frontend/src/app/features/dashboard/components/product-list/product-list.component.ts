import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Product } from '../../../../shared/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatCell, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatRow, MatTable, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [
    CommonModule,
    MatTable,
    MatPaginator,
    MatRow,
    MatHeaderCellDef,
    MatHeaderRow,
    MatIcon,
    MatCell,
    MatHeaderCell,
    CurrencyPipe,
    MatButtonModule,
    MatTableModule,
    MatCard,

  ]
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryFilter']) {
      this.applyCategoryFilter();
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log('Product-List response', response);
        if(response.success){
            this.notification.showSuccess(response.message);
            this.products = response.products;
            this.applyCategoryFilter();
        }else{
            this.notification.showError(response.message);
        }
    },
      error: (err) => this.notification.showError(err.message)
    });
  }

  private applyCategoryFilter(): void {
    if (this.categoryFilter) {
      this.filteredProducts = this.products.filter(p => p.category === this.categoryFilter);
    } else {
      this.filteredProducts = this.products;
    }
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
      next: (response: any) => {
        console.log('Product-List response', response);
        if(response.success){
            this.notification.showSuccess(response.message);
            this.products = response.products;
            this.applyCategoryFilter();
        }else{
            this.notification.showError(response.message);
        }
      },
      error: (err: any) => this.notification.showError(err.message)
    });
  }
}