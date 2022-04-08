import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartPageComponent } from "./cart/cart-page/cart-page.component";
import { CheckoutPageComponent } from "./cart/checkout-page/checkout-page.component";
import { BiddingComponent } from "./features/bidding/bidding-dashboard/bidding-dashboard-component";
import { BiddingHistoryComponent } from "./features/bidding/bidding-history/bidding-history-component";
import { BiddingProductViewComponent } from "./features/bidding/bidding-product-view/bidding-product-view-component";
import { LandingPageComponent } from "./home/landing-page/landing-page.component";
import { AddReviewComponent } from "./product-review/add-review/add-review.component";
import { ListComponent } from "./products/list/list.component";
import { ProductPageComponent } from "./products/product-page/product-page.component";
import { SellerloginComponent } from "./seller/sellerlogin/sellerlogin.component";
import { SellerprofileComponent } from "./seller/sellerprofile/sellerprofile.component";
import { SellerregisterComponent } from "./seller/sellerregister/sellerregister.component";
import { LoginComponent } from "./user/login/login.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { RegisterComponent } from "./user/register/register.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { SuccessPageComponent } from "./cart/success-page/success-page.component";
import { FailurePageComponent } from "./cart/failure-page/failure-page.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "profile", component: ProfileComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "seller-register", component: SellerregisterComponent },
  { path: "seller-login", component: SellerloginComponent },
  { path: "seller-profile", component: SellerprofileComponent },
  { path: "products", component: ListComponent },
  { path: "product-page/:id", component: ProductPageComponent },
  { path: "category/:id", component: ListComponent },
  { path: "shopping-cart", component: CartPageComponent },
  { path: "checkout", component: CheckoutPageComponent },
  // { path: "checkout", component: CartPageComponent },
  {
    path: "bidding",
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: BiddingComponent },
      { path: "history", component: BiddingHistoryComponent },
      { path: "view/:id", component: BiddingProductViewComponent },
    ],
  },
  { path: "add-review/:id", component: AddReviewComponent },
  { path: "getCartDetails", component: ShoppingCartComponent },
  { path: "success", component: SuccessPageComponent },
  { path: "failure", component: FailurePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
