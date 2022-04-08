/**
 * Author: ABHISHEK KARTHIK MANIKANDAN
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class HeroService {
  dev_url: string = environment.url;
  constructor(private http: HttpClient) {}

  getCategoryDetails() {
    return this.http.get(this.dev_url + "/category/getCategoryDetails");
  }

  getFlashDealProducts() {
    return this.http.get(this.dev_url + "/products/getFlashDealProducts/0");
  }

  getProductDetailsById(id: string) {
    return this.http.get(this.dev_url + "/products/getProductDetailsById/" + id);
  }
}
