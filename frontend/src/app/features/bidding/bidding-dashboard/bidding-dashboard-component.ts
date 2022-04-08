/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { BiddingProduct } from 'src/app/shared/model/biddingProduct';
import { BiddingService } from 'src/app/shared/service/bidding-service';


@Component({
  selector: 'bidding',
  templateUrl: './bidding-dashboard-component.html',
  styleUrls: ['./bidding-dashboard-component.scss']
})
export class BiddingComponent { 

  biddingData: BiddingProduct[]=[];
  visibleSidebar2=false;

    constructor(private biddingService:BiddingService,private router:Router) { }

    ngOnInit() {
       this.biddingService.getBiddingProducts().subscribe((res:any)=>{
         console.log("hello in res"+ JSON.stringify(res));
         if(res && res.biddingProducts){
          this.biddingData=res.biddingProducts;
         }
         
       });
    }

    navigateToBiddingView(bidDetails:any){
      this.router.navigate(['bidding/view',bidDetails['_id']]);
    }

    navigateToHistory(){
      this.router.navigate(['bidding/history']);
    }

}
