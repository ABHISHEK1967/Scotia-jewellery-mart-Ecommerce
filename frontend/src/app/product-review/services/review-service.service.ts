/* Authored by Rutu Joshi, B00897744, rt296393@dal.ca
 */import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ReviewServiceService {
  dev_url: string = environment.url;
  constructor(private http: HttpClient) {}

  getReviews(uri: string) {
    return this.http.get(
      this.dev_url + "/product-reviews/getReviews/" + `${uri}`
    );
  }

  postReview(id: string, body: any, file: File[]) {
    const formData: FormData = new FormData();
    file.forEach((file) => formData.append("picture", file, file.name));
    formData.append("review", JSON.stringify(body));
    return this.http.post(
      this.dev_url + "/product-reviews/insertReview/" + `${id}`,
      formData
    );
  }

  deleteReview(uri: string) {
    console.log("hello check deleteReview");
    return this.http.delete(
      this.dev_url + "/product-reviews/deleteReview/" + `${uri}`
    );
  }
}
