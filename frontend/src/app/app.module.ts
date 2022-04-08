import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./home/header/header.component";
import { FooterComponent } from "./home/footer/footer.component";
import { HeroComponent } from "./home/hero/hero.component";
import { BestsellersComponent } from "./home/bestsellers/bestsellers.component";
import { LandingPageComponent } from "./home/landing-page/landing-page.component";
import { NgxUsefulSwiperModule } from "ngx-useful-swiper";
import { PrimengModule } from "./shared/primeng/primeng.module";
import { HttpClientModule } from "@angular/common/http";
import { ListComponent } from "./products/list/list.component";
import { ProductPageComponent } from "./products/product-page/product-page.component";
import { ProductItemComponent } from "./products/product-item/product-item.component";
import { CartService } from "./shared/service/cart.service";
import { CartPageComponent } from "./cart/cart-page/cart-page.component";
import { CheckoutPageComponent } from "./cart/checkout-page/checkout-page.component";
import { LoginComponent } from "./user/login/login.component";
import { RegisterComponent } from "./user/register/register.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { SellerprofileComponent } from "./seller/sellerprofile/sellerprofile.component";
import { SellerregisterComponent } from "./seller/sellerregister/sellerregister.component";
import { SellerloginComponent } from "./seller/sellerlogin/sellerlogin.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedCustomModule } from "./shared/shared-module";
import { FeatureModule } from "./features/feature.module";

import { AngularmaterialModule } from "./shared/angularmaterial/angularmaterial.module";
import { ReviewsComponent } from "./product-review/reviews/reviews.component";
import { SingleReviewComponent } from "./product-review/single-review/single-review.component";
import { DeleteReviewComponent } from "./product-review/delete-review/delete-review.component";
import { AddReviewComponent } from "./product-review/add-review/add-review.component";
import { MaterialModule } from "./material/material.module";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { SuccessPageComponent } from "./cart/success-page/success-page.component";
import { FailurePageComponent } from "./cart/failure-page/failure-page.component";
import { NgxStripeModule } from "ngx-stripe";
import { NgxSpinnerModule } from "ngx-spinner"
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    BestsellersComponent,
    LandingPageComponent,
    ListComponent,
    ProductPageComponent,
    ProductItemComponent,
    CartPageComponent,
    CheckoutPageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SellerprofileComponent,
    SellerregisterComponent,
    SellerloginComponent,
    ReviewsComponent,
    SingleReviewComponent,
    DeleteReviewComponent,
    AddReviewComponent,
    ShoppingCartComponent,
    SuccessPageComponent,
    FailurePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    SharedCustomModule,
    FeatureModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularmaterialModule,
    MaterialModule,
    NgxStripeModule.forRoot(
      "pk_test_51KkYSaBpnie1hhd2QGrdq2S7IMGJhTXz9jzq3FakqzlnAWdODkMQpyOmJpYZiynaVtup7AI1taeRl81f1xBf9CzN00JNiB5M4B"
    ),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private cartService: CartService) {
    this.cartService.initializeEmptyCart();
  }
}
