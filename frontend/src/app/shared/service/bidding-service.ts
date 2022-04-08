/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BiddingService {
  serviceUrl = environment.url + "/bidding";
  constructor(private http: HttpClient) {}

  getBiddingProducts(): Observable<any> {
    const headers = { "content-type": "application/json" };
    return this.http.get(this.serviceUrl + "/getAvailableBiddingProducts", {
      headers: headers,
    });
  }

  getBiddingProductById(id: any) {
    const headers = { "content-type": "application/json" };
    return this.http.get(this.serviceUrl + "/getBiddingProductById/" + id, {
      headers: headers,
    });
  }

  getUserBiddingDetails(reqbdy: any) {
    const headers = { "content-type": "application/json" };
    return this.http.post(this.serviceUrl + "/getBiddersDetails", reqbdy, {
      headers: headers,
    });
  }

  getHighestBidders(productId: any): Observable<any> {
    const headers = { "content-type": "application/json" };
    console.log(productId);
    return this.http.get(
      this.serviceUrl + "/getHighestBiddedAmountByProductId/" + productId,
      { headers: headers }
    );
  }

  getBiddingHistory(userId: any): Observable<any> {
    const headers = { "content-type": "application/json" };
    console.log(userId);
    return this.http.get(this.serviceUrl + "/historyBidding/" + userId, {
      headers: headers,
    });
  }

  postBiddingProducts(reqbdy: any): Observable<any> {
    const headers = { "content-type": "application/json" };
    console.log(reqbdy);
    return this.http.post(this.serviceUrl + "/createBiddingProduct", reqbdy, {
      headers: headers,
    });
  }

  placeABid(reqbdy: any): Observable<any> {
    const headers = { "content-type": "application/json" };
    return this.http.post(this.serviceUrl + "/placeABid", reqbdy, {
      headers: headers,
    });
  }
}
