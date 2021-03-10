import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from './gallery.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Store Gallery'
    },
    component: GalleryComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes), NgxDatatableModule],
  declarations: [GalleryComponent]
})
export class GalleryModule {}
