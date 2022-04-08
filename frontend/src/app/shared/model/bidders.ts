/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import { BiddingProduct } from "./biddingProduct";

export interface Bidders{
    id: string;
    userId: string,
    bid_amount: Number,
    bid_status:string,
    biddingProductId: BiddingProduct
}