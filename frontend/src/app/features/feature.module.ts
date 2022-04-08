/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxUsefulSwiperModule } from "ngx-useful-swiper";
import { PrimengModule } from "../shared/primeng/primeng.module";
import { SharedCustomModule } from "../shared/shared-module";
import { BiddingComponent } from "./bidding/bidding-dashboard/bidding-dashboard-component";
import { BiddingHistoryComponent } from "./bidding/bidding-history/bidding-history-component";
import { BiddingProductViewComponent } from "./bidding/bidding-product-view/bidding-product-view-component";

@NgModule({
  declarations: [
    BiddingComponent,
    BiddingHistoryComponent,
    BiddingProductViewComponent
  ],
  imports: [
    CommonModule,
    SharedCustomModule,
    PrimengModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    FormsModule
  ]
})
export class FeatureModule {}
