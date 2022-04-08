import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeroService } from "src/app/home/services/heroService/hero.service";
import { Cart, Items } from "src/app/shared/model/cart";
import { CartService } from "src/app/shared/service/cart.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { CheckoutService } from "src/app/shared/service/checkout.service";

@Component({
  selector: "app-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styleUrls: ["./checkout-page.component.scss"],
})
export class CheckoutPageComponent implements OnInit {
  shoppingCart: any = [];
  quantity: number = 1;
  sum: number = 0;
  tax: number = 0;
  shipping: number = 0;
  total: number = 0;
  checkoutForm: FormGroup;
  constructor(
    private router: Router,
    private heroService: HeroService,
    private cartService: CartService,
    private fb: FormBuilder,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
    this.initForm();
  }

  getProductDetails(): void {
    const cart: Cart = JSON.parse(localStorage.getItem("cart"));

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
  }
  initForm() {
    this.checkoutForm = this.fb.group({
      city: [
        "",
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern("^[a-zA-Z]*$"),
        ],
      ],
      address: ["", [Validators.required, Validators.maxLength(100)]],
      state: [
        "",
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern("^[a-zA-Z]*$"),
        ],
      ],
      zip: ["", [Validators.required, Validators.maxLength(7)]],
      email: [""],
      user: [""],
      orderItems: [""],
      price: [""],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.checkoutForm.controls;
  }
  placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    this.checkoutForm.patchValue({ email: sessionStorage.getItem("email") });
    this.checkoutForm.patchValue({ user: sessionStorage.getItem("UserId") });
    this.checkoutForm.patchValue({ orderItems: cart.products });
    this.checkoutForm.patchValue({ price: this.total });
    localStorage.setItem("orderItems", JSON.stringify(this.checkoutForm.value));
    this.checkoutService
      .checkoutSession(this.checkoutForm.value)
      .subscribe((error: any) => {
        if(error) {
          console.log("payment failed")
        }
      });
  }
}
