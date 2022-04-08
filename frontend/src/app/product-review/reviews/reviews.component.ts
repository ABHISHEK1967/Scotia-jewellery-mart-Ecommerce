/* Authored by Rutu Joshi, B00897744, rt296393@dal.ca */
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { ReviewServiceService } from "../services/review-service.service";
//import { response } from 'express';

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.css"],
})
export class ReviewsComponent implements OnInit {
  averageRating: number;

  getreviews = [] as any;

  userReviews = [] as any;
  otherReviews = [] as any;
  ratings = [] as any;
  total = 0;
  averagerating = 0;
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ReviewServiceService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.getReviewsFromApi();
  }

  getReviewsFromApi() {
    this.service.getReviews(this.id).subscribe((response:any) => {
      this.getreviews = response;
      this.userReviews = this.getreviews.data.array1;
      this.otherReviews = this.getreviews.data.array2;
      this.avgReview();
    });
  }

  avgReview() {
    this.total = 0;
    for (let review of this.userReviews) {
      this.total = this.total + review.rating;
    }
    for (let review of this.otherReviews) {
      this.total = this.total + review.rating;
    }

    this.averagerating =
      this.total / (this.userReviews.length + this.otherReviews.length);
    this.averagerating = Math.floor(this.averagerating);
  }
  writeReview(): void {
    this.router.navigate(["./add-review/" + this.id]);
  }
}
