/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

export interface BiddingProduct{
    id: string;
    name: string;
    description: string;
    images:any;
    startingBidPrice:Number;
    currentBidPrice:Number;
    startTime:string;
    endTime:string;
}