/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BiddingProduct } from 'src/app/shared/model/biddingProduct';
import { BiddingService } from 'src/app/shared/service/bidding-service';
import { SwiperOptions } from "swiper";

@Component({
  selector: 'bidding-product-view',
  templateUrl: './bidding-product-view-component.html',
  styleUrls: ['./bidding-product-view-component.scss']
})
export class BiddingProductViewComponent { 
    product: BiddingProduct;

    bidderDetails:any={
      bid_amount: 0
    };
    highestBiddingAmount:any;
    config: SwiperOptions = {};
    userId:any;
    biddingProductId:any;
    constructor(private biddingService:BiddingService,private route: ActivatedRoute,) { }

    ngOnInit(){
      
      this.route.params.subscribe((params: any) => {
        if(params.id){
          this.biddingProductId=params.id;
        }
      });

      this.config = {
        observer: true,
        observeParents: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        spaceBetween: 30,
        loop: true
      };
      this.userId=sessionStorage.getItem("UserId");
      this.getHighestBidder();
      this.getBiddingProduct();
      this.getUserBiddingDetails();
    }

    getBiddingProduct(){
      this.biddingService.getBiddingProductById(this.biddingProductId).subscribe((res:any)=>{
        this.product=res.biddingProduct;
      });
    }

    getUserBiddingDetails(){
      let postBdy={
        userId:this.userId,
        biddingProductId:this.biddingProductId
      }

      console.log(JSON.stringify(postBdy));
      this.biddingService.getUserBiddingDetails(postBdy).subscribe((res:any)=>{
        if(res && !res.message){
          this.bidderDetails=res.bidders;
        }
      });
    }

    getHighestBidder(){
      this.biddingService.getHighestBidders(this.biddingProductId).subscribe((res:any)=>{
        if(res && res.success){
          this.highestBiddingAmount=res.bidders[0].bid_amount; 
        }else{
          this.highestBiddingAmount=res.message;
        }
      });
    }

    placeABid(){
      let postBdy={
        userId:this.userId,
        biddingProductId:this.biddingProductId,
        bid_amount:Number(this.bidderDetails.bid_amount)
      };

      this.biddingService.placeABid(postBdy).subscribe(res=>{
        if(!res.success){
          alert(res.msg);
        }else{
          this.bidderDetails=res.biddersDetails;
          this.getHighestBidder();
          alert("Thank you for bidding");
        } 
      });
    }

}
