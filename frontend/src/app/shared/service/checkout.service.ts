import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { StripeService } from "ngx-stripe";
import { switchMap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class CheckoutService {
  dev_url: string = environment.url;
  constructor(private http: HttpClient, private stripeService: StripeService) {}

  checkoutSession(cart: any) {
    return this.http
      .post(this.dev_url + "/order/createCheckoutSession", cart)
      .pipe(
        switchMap((session: any) =>{
          sessionStorage.setItem("sessionId",session.id)
          return this.stripeService.redirectToCheckout({ sessionId: session.id })
        })
      );
  }
  placeOrder(cart: any){
    return this.http
    .post(this.dev_url + "/order/saveOrderDetails", cart);
  }
}
