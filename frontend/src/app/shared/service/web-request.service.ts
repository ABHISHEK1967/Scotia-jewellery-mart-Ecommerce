/* Authored by Meshwa Savalia, B00890170, ms959884@dal.ca
 */import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebRequestService {
  readonly ROOT_URL = environment.url;
  constructor(private http: HttpClient) {}
  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }
  post(url: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, payload);
  }
  put(url: string, payload: Object) {
    return this.http.put(`${this.ROOT_URL}/${url}`, payload);
  }
  patch(url: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${url}`, payload);
  }
  delete(url: string, payload: Object) {
    return this.http.delete(`${this.ROOT_URL}/${url}`, payload);
  }
}
