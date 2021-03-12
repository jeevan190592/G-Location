import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Products} from '../models';
import { NotifierService } from 'angular-notifier';

declare var require: any;
const ddata: any = require('./company.json');
let data: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private readonly notifier: NotifierService;
  constructor(private productService: ProductService, notifierService: NotifierService) {
    this.notifier = notifierService;
    /*this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500); */
  }
  editing = {};
  rows = [];
  temp = [...this.rows];

  loadingIndicator = true;
  reorderable = true;

  // columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  loadProducts() {
    this.productService.getProducts(localStorage.getItem('userID')).subscribe((products) => {
      this.rows = products;
      data = products;
      this.temp = [...data];
      console.log(products);
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.updateProduct(this.rows[rowIndex]);
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  updateProduct(product: Products) {
    this.productService.updateProduct(product).subscribe((result: string) => {
      let message: string;
      if (result = 'success') {
        message = 'Product updated successfully';
      } else {
        message = 'Failed to update product';

      }
      this.showNotification(result, message);
      console.log(result);
    });
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
    alert(message);
  }
  ngOnInit(): void {
    this.loadProducts();
  }
}
