/**
 * Author: ABHISHEK KARTHIK MANIKANDAN
 */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Category } from "src/app/shared/model/category";
import { HeroService } from "../services/heroService/hero.service";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent implements OnInit, OnDestroy {
  categories?: Category[] = [];
  $Sub: Subject<any> = new Subject();
  constructor(private heroService: HeroService, private route: Router,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.heroService
      .getCategoryDetails()
      .pipe(takeUntil(this.$Sub))
      .subscribe((category: any) => {
        this.categories = category.categories;
        this.spinner.hide();
      });
  }

  navigateToCategory(id: string) {
    this.route.navigate(["category", id]);
  }

  navigateToProductsPage() {
    this.route.navigate(["products"]);
  }
  ngOnDestroy(): void {
    this.$Sub.next("");
    this.$Sub.complete();
  }
}
