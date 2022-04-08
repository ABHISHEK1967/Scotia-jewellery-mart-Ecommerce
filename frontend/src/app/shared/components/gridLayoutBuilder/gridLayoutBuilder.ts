/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { Items } from "../../model/cart";
import { CartService } from "../../service/cart.service";

@Component({
  selector: "grid-layout-builder",
  templateUrl: "./gridLayoutBuilder.html",
  styleUrls: ["./gridLayoutBuilder.scss"],
})
export class GridLayoutBuilder {
  @Input() gridData: any = [];
  @Input() gridParent: any;
  @Output() actionTriggered = new EventEmitter();
  quantity: number = 1;
  productId: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  action(bidProduct: any) {
    this.actionTriggered.emit(bidProduct);
  }

  navigateToProductPage(id: string) {
    this.router.navigate(["product-page", id]);
  }

  addToCart(id:string): void {
    const newCartProduct: Items = {
      productId: id,
      quantity: this.quantity,
    };
    this.cartService.addToCart(newCartProduct);
  }
}
