import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Product Details'
    },
    component: ProductComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes), NgxDatatableModule],
  declarations: [ProductComponent]
})
export class ProductModule {}
