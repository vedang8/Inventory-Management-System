import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { MAT_DIALOG_SCROLL_STRATEGY_PROVIDER, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    ProductListComponent,
    MatDialogModule,
    MatIcon,
    MatDividerModule
  ]
})
export class DashboardComponent implements OnInit {
  categories = ['Electronics', 'Clothing', 'Books', 'Furniture']; // Sample categories
  selectedCategory: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
  }
}