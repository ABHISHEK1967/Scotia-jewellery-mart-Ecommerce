import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/shared/service/cart.service";
import { CheckoutService } from "src/app/shared/service/checkout.service";

@Component({
  selector: "app-success-page",
  templateUrl: "./success-page.component.html",
  styleUrls: ["./success-page.component.scss"],
})
export class SuccessPageComponent implements OnInit {
  constructor(private checkoutService: CheckoutService,private cartService: CartService) {}

  ngOnInit(): void {
    const cart = JSON.parse(localStorage.getItem("orderItems"));
    const sessionId = sessionStorage.getItem("sessionId");
    if (sessionId!=null) {
      this.checkoutService.placeOrder(cart).subscribe(() => {
        localStorage.removeItem("cart");
        localStorage.removeItem("orderItems");
        sessionStorage.removeItem("sessionId")
        this.cartService.initializeEmptyCart();
      });
    }
  }
}
