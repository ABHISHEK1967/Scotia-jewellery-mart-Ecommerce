/**
 * Author: ABHISHEK KARTHIK MANIKANDAN
 */
import { Cart } from "./../../shared/model/cart";
import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/shared/service/cart.service";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/shared/service/globalService";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  toggleNavbar: boolean = true;
  productsCount: string;
  cart: Cart;
  srchField = "";
  dataSource: any = [];
  items: any = 0;
  loggedIn:any="false";
  userLogin=false;
  // constructor(private cartService: CartService, private router:Router,private globalService:GlobalService) {
  constructor(
    private cartService: CartService,
    // private taskService: TaskService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.cart = JSON.parse(localStorage.getItem("cart"));
  }

  ngOnInit(): void {
    this.cartService.cartUpdate$.subscribe((cart: Cart) => {
      this.productsCount = String(cart?.products?.length ?? 0);
    });
    this.loggedIn = sessionStorage.getItem("Login");

    //this.loggedIn=sessionStorage.getItem("Login");

    this.globalService.navItemHeaderShare.subscribe((res) => {
      // console.log(res+ "res check");
      this.loggedIn = res;
      // console.log(this.loggedIn+ "hello" );
    });

    this.userLogin=sessionStorage.hasOwnProperty("Login")
   // this.loggedIn=sessionStorage.getItem("Login");

    // this.getTotalItemsinCart();
  }

  navigateToCheckoutPage(): void {
    this.router.navigate(["shopping-cart"]);
    // this.router.navigate(["getCartDetails"]);
  }

  setSrchValue() {
    this.router.navigate(["products"]);
    this.globalService.passNavSearchValue(this.srchField);
  }

  logout(){
    sessionStorage.removeItem("Login");
    sessionStorage.removeItem("UserId")
    this.loggedIn=false
    this.router.navigate(['/']);
  }
  // getTotalItemsinCart() {
  //   this.taskService.viewCart().subscribe((response: any) => {
  //     this.dataSource = response.data;
  //     this.items = this.dataSource.length;
  //     this.productsCount = String(this.dataSource?.length ?? 0);
  //   });
  // }
}
