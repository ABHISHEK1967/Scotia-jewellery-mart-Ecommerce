/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import {Component, Input} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'table-layout-builder',
  templateUrl: './tableLayoutBuilder.html',
  styleUrls: ['./tableLayoutBuilder.scss']
})
export class TableLayoutBuilder { 
  @Input() tableData:any;

    first = 0;
    rows = 10;

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
       // this.productService.getProducts().then(data => this.products = data);
        this.primengConfig.ripple = true;
    }

    next() {
        this.first = this.first + this.rows;
    }
    
    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.tableData ? this.first === (this.tableData.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.tableData ? this.first === 0 : true;
    }

}
