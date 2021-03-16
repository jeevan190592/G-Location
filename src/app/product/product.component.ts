import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Products} from '../models';
import {NotifierService} from 'angular-notifier';

declare var require: any;
let data: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  message = '';
  failMessage = false;
  successMessage = false;
  showAddElements = true;

  constructor(private productService: ProductService, private routes: Router) {
  }

  editing = {};
  rows = [];
  temp = [...this.rows];
storeID;
  storeName;
  loadingIndicator = true;
  reorderable = true;

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  ngOnInit(): void {
    if (!localStorage.getItem('userID')) {
      this.showAddElements = false;
    }
    if (localStorage.getItem('storeID')) {
      this.storeID = localStorage.getItem('storeID');
      this.storeName = localStorage.getItem('storeName');
      this.loadProducts();
    } else {
      this.routes.navigate(['/search']);
    }
  }

  loadProducts() {
    this.productService.getProducts(this.storeID).subscribe((products) => {
      this.rows = products;
      data = products;
      this.temp = [...data];
      this.table = data;
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = data;
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    if (this.showAddElements) {
      if (!event.target.value) {
        alert('Cannot save empty fields');
        return;
      }
      if (cell === 'weight' || cell === 'price' || cell === 'barcode') {
        if (!(/^\d+$/.test(event.target.value))) {
          alert('Please provide only numbers');
          return;
        }
      }
      if (this.rows[rowIndex][cell] !== event.target.value) {
        console.log('inline editing rowIndex', rowIndex);
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        this.updateProduct(this.rows[rowIndex]);
        console.log('UPDATED!', this.rows[rowIndex][cell]);
      }
    } else {
      this.failMessage = true;
      this.message = 'Not authorised to edit products. Please login to edit.';
    }
  }

  updateProduct(product: Products) {
    this.productService.updateProduct(product).subscribe((result: string) => {
      if (result === 'success') {
        this.successMessage = true;
        this.message = 'Product updated successfully in database';
      } else {
        this.failMessage = true;
        this.message = 'Failed to update product in database';
      }
      setTimeout(() => {
        this.failMessage = false;
        this.successMessage = false;
      }, 4000);
    });
  }

  addProduct(name: string, barcode: string, location: string, price: string, weight: string, form: any) {
    if (name && barcode && location && price && weight) {
      this.productService.addProduct(name, barcode, location, price, weight).subscribe((result: string) => {
        if (result === 'success') {
          this.loadProducts();
          this.successMessage = true;
          this.message = 'Product added successfully in database';
          form.reset();
        } else {
          this.failMessage = true;
          this.message = 'Failed to add product in database';
        }
        setTimeout(() => {
          this.failMessage = false;
          this.successMessage = false;
        }, 3000);
      });
    }
  }

  deleteProduct(rowIndex) {
    if (confirm('Are you sure to delete ' + this.rows[rowIndex].name)) {
      this.productService.deleteProduct(this.rows[rowIndex]).subscribe((result: string) => {
        if (result === 'success') {
          this.loadProducts();
          this.successMessage = true;
          this.message = 'Product deleted successfully in database';
        } else {
          this.failMessage = true;
          this.message = 'Failed to delete product in database';
        }
        setTimeout(() => {
          this.failMessage = false;
          this.successMessage = false;
        }, 3000);
      });
    }

  }


}
