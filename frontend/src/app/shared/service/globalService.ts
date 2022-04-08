// Authoered by Xiao Ling, B00877105, xz540782

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

/*
 To pass the keywords in the search bar to other components
 */

@Injectable({
  providedIn: "root",
})
export class GlobalService {
    //searchKeyWord:any;
    private _navItemSource = new BehaviorSubject<any>("");
    private _navItemHeader = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("Login")));
    
    navItem$ = this._navItemSource.asObservable();
    navItemHeaderShare= this._navItemHeader.asObservable();
    passNavSearchValue(val:any){
      //console.log("I am global service");
      this._navItemSource.next(val);
       // this.searchKeyWord=val;
    }

    getLoggedInStatus(){
      console.log("hello server");
      this._navItemHeader.next(JSON.parse(sessionStorage.getItem("Login")));
    }

    
}
