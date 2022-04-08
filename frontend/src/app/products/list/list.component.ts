/*
 Filter and search methods authored by Xiao Ling, B00877105, xz540782@dal.ca
 The rest authored by Abhishek Karthik Manikandan, B00870510, ab620101@dal.ca
 */

import { Category } from "./../../shared/model/category";
import { HeroService } from "./../../home/services/heroService/hero.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ProductsService } from "../services/products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FilterService } from "src/app/shared/service/filter-service";
import { HeaderComponent } from "src/app/home/header/header.component";
import { GlobalService } from "../../shared/service/globalService";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  categories?: any[] = [];
  $Sub: Subject<any> = new Subject();
  products: any;
  hideCategory: Boolean = false;
  filterObj: any = {
    brand: "",
    category: "",
    min_price: 0,
    max_price: 1000000,
  };
  searchedKeyword = "";
  visibleSidebar2 = false;
  searchObserver: any;
  sortValue: any = 0;

  constructor(
    private productService: ProductsService,
    private heroService: HeroService,
    private filterService: FilterService,
    private _navService: GlobalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      params.id ? this.getProducts([params.id]) : this.getProducts();
      params.id ? (this.hideCategory = true) : (this.hideCategory = false);
    });
    this.searchObserver = this._navService.navItem$.subscribe((item: any) => {
      this.searchedKeyword = item;
      this.filterProductList();
    });

    this.getCategories();
  }

  ngOnDestroy() {
    this.searchObserver.unsubscribe();
  }

  getProducts(catgeories?: string[]) {
    this.productService
      .getProductDetails(catgeories)
      .pipe(takeUntil(this.$Sub))
      .subscribe((products: any) => {
        this.products = products.products;
      });
  }

  getCategories() {
    this.heroService
      .getCategoryDetails()
      .pipe(takeUntil(this.$Sub))
      .subscribe((category: any) => {
        this.categories = category.categories;
      });
  }

  fetchCategory() {
    const checkedCategories = this.categories
      ?.filter((category) => category.checked)
      .map((category) => category.id);
    this.getProducts(checkedCategories);
  }

  openFilterPanel() {
    this.visibleSidebar2 = true;
  }

  setSortValue(val: any) {
    this.sortValue = val;
    this.filterProductList();
    console.log(this.sortValue + " sort val");
  }

 /* request API to the backend:
  request body:
  {
      keyword: String,
      filter: {
        "brand": String,
        "category": String,
        "min_price": Number,
        "max_price": Number
      }
      "sort": 1 (1 for price ascending, -1 for descending, 0 for by relevance)
  }

  response API from the backend:
  {
      success: true,
      match: [Product]
  }
  */

  filterProductList(){
    console.log(this.searchedKeyword+" Filter Obj");
    let postObj={
      keyword: this.searchedKeyword,
      filter: this.filterObj,
      sort: this.sortValue,
    };

    this.filterService.filter(postObj).subscribe((filterRes) => {
      //console.log(JSON.stringify(filterRes)+" Hello res");
      this.products = filterRes.match;
    });
  }

  navigateToProductPage(id: string) {
    this.router.navigate(["product-page", id]);
  }
}
