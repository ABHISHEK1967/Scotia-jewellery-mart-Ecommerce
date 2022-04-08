/**
 * Author: ABHISHEK KARTHIK MANIKANDAN
 */
import { Items } from "./../../shared/model/cart";
import { Component, Input, OnInit } from "@angular/core";
import { CartService } from "src/app/shared/service/cart.service";

import { Router } from "@angular/router";
import { TaskService } from "src/app/shared/service/task.service";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;

  constructor(
    private cartService: CartService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addToCart(product: any): void {
    const item: Items = { productId: product.id, quantity: 1 };
    this.cartService.addToCart(item);
  }

  navigateToProductPage(id: string) {
    this.router.navigate(["product-page", id]);
  }
}
