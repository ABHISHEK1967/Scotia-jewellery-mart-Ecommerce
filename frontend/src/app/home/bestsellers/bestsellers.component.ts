/**
 * Author: ABHISHEK KARTHIK MANIKANDAN
 */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { SwiperOptions } from "swiper";
import { HeroService } from "../services/heroService/hero.service";
@Component({
  selector: "app-bestsellers",
  templateUrl: "./bestsellers.component.html",
  styleUrls: ["./bestsellers.component.scss"],
})
export class BestsellersComponent implements OnInit, OnDestroy {
  config: SwiperOptions = {};
  $Sub: Subject<any> = new Subject();
  bestseller: any;
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.config = {
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        320: { slidesPerView: 1 },
        425: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        960: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
      },
    };

    this.heroService
      .getFlashDealProducts()
      .pipe(takeUntil(this.$Sub))
      .subscribe((bestseller: any) => {
        this.bestseller = bestseller.products;
      });
  }
  ngOnDestroy(): void {
    this.$Sub.next("");
    this.$Sub.complete();
  }
}
