/**
 * Author: ABHISHEK KARTHIK MANIKANDAN
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "src/app/home/services/heroService/hero.service";
import { Items } from "src/app/shared/model/cart";
import { CartService } from "src/app/shared/service/cart.service";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.scss"],
})
export class ProductPageComponent implements OnInit {
  reviewValue: number = 3;
  quantity: number = 1;
  productId: string;
  val2: number = 3;
  val4: number = 0;
  productDetails: any;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.productId = params["id"];
      this.getProductDetails();
    });
  }

  addToCart(): void {
    const newCartProduct: Items = {
      productId: this.productId,
      quantity: this.quantity,
    };
    this.cartService.addToCart(newCartProduct);
  }

  getProductDetails(): void {
    this.heroService
      .getProductDetailsById(this.productId)
      .subscribe((productDetails: any) => {
        this.productDetails = productDetails;
      });
  }
}
