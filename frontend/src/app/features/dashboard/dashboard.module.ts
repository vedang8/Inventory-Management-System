import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent }
    ]),
    MatFormFieldModule, // ✅ Required for <mat-form-field>
    MatSelectModule, // ✅ Required for <mat-select>
    MatOptionModule, // ✅ Required for <mat-option>
    MatButtonModule // ✅ Required for <button mat-raised-button>
  ],
  exports: [DashboardComponent, ProductListComponent, ProductFormComponent]
})
export class DashboardModule { }