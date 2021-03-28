import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {ProductComponent} from './product.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NotifierModule} from 'angular-notifier';

import {BarcodeScannerLivestreamOverlayModule} from 'ngx-barcode-scanner';

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
  imports: [
    BarcodeScannerLivestreamOverlayModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    NgbModule,
    NotifierModule,
    ReactiveFormsModule
  ],
  declarations: [ProductComponent]
})
export class ProductModule {
}
