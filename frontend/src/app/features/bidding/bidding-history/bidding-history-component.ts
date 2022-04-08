
/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import {Component} from '@angular/core';
import { Bidders } from 'src/app/shared/model/bidders';
import { BiddingService } from 'src/app/shared/service/bidding-service';


@Component({
  selector: 'bidding-history',
  templateUrl: './bidding-history-component.html',
  styleUrls: ['./bidding-history-component.scss']
})
export class BiddingHistoryComponent { 
  userId:any;
    tableData: Bidders[]=[];

    constructor(private biddingService:BiddingService) {}

    ngOnInit() {
       this.userId=sessionStorage.getItem("UserId");
       this.biddingService.getBiddingHistory(this.userId).subscribe(res=>{
          this.tableData=res.biddingHistory;
       });
    }

}
