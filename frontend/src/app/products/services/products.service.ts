/**
 * Author: ABHISHEK KARTHIK MANIKANDAN
 */
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ProductsService {
  dev_url: string = environment.url;
  constructor(private http: HttpClient) {}

  getProductDetails(catgeories?: string[]) {
    let params = new HttpParams();
    if (catgeories) {
      params = params.append("categories", catgeories.join(","));
    }
    return this.http.get(this.dev_url + "/products/getProductDetails", {
      params: params,
    });
  }
}
