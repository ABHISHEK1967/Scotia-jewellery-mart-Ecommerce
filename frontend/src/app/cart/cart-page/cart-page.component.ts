import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeroService } from "src/app/home/services/heroService/hero.service";
import { Cart, Items } from "src/app/shared/model/cart";
import { CartService } from "src/app/shared/service/cart.service";

@Component({
  selector: "app-cart-page",
  templateUrl: "./cart-page.component.html",
  styleUrls: ["./cart-page.component.scss"],
})
export class CartPageComponent implements OnInit {
  shoppingCart: any = [];
  quantity: number = 1;
  sum: number = 0;
  tax: number = 0;
  shipping: number = 0;
  total: number = 0;
  constructor(
    private router: Router,
    private heroService: HeroService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    const cart: Cart = JSON.parse(localStorage.getItem("cart"));
    if (cart.products?.length > 0) {
      cart.products.forEach((item) => {
        this.heroService
          .getProductDetailsById(item.productId)
          .subscribe((productDetails: any) => {
            this.shoppingCart.push({
              details: productDetails.products,
              quantity: item.quantity,
            });
            this.sum = 0;
            for (let prod of this.shoppingCart) {
              this.sum = this.sum + prod.details.price * prod.quantity;
            }
            this.tax = this.sum * 0.15;
            this.shipping = 30;
            this.total = this.sum + this.tax + this.shipping;
          });
      });
    } else {
      this.sum = 0;
      this.tax = 0;
      this.shipping = 0;
      this.total = 0;
    }
  }
  navigateToHome(): void {
    this.router.navigate([""]);
  }
  navigateToCheckoutPage(): void {
    const userId = sessionStorage.getItem("UserId");
    if (userId) {
      this.router.navigate(["checkout"]);
    } else {
      this.router.navigate(["login"]);
    }
  }

  addToCart(id: string, quantity: number): void {
    const newCartProduct: Items = {
      productId: id,
      quantity: quantity,
    };
    this.cartService.updateCart(newCartProduct);
    this.shoppingCart = [];
    this.getProductDetails();
  }

  deleteCart(id: string) {
    const newCartProduct: Items = {
      productId: id,
      quantity: this.quantity,
    };
    this.cartService.deleteCart(newCartProduct);
    this.shoppingCart = [];
    this.getProductDetails();
  }
}
