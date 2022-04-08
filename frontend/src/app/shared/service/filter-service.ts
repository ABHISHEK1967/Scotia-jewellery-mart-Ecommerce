import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  serviceUrl = environment.url + "/search/filter";
  constructor(private http: HttpClient) {}

  filter(reqbdy: any): Observable<any> {
    const headers = { "content-type": "application/json" };
    //const body=JSON.stringify(person);
    console.log(reqbdy);
    return this.http.post(this.serviceUrl, reqbdy, { headers: headers });
  }
}
