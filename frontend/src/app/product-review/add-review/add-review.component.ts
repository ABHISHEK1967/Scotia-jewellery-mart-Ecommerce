/* Authored by Rutu Joshi, B00897744, rt296393@dal.ca */
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ReviewServiceService } from "../services/review-service.service";

@Component({
  selector: "app-add-review",
  templateUrl: "./add-review.component.html",
  styleUrls: ["./add-review.component.css"],
})
export class AddReviewComponent implements OnInit {
  previews: string[] = [];
  uploadedFiles: any[] = [];
  file: File = null;
  uploadFileForm = new FormGroup({
    fileName: new FormControl(null),
  });
  id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
  }


  onUpload(event:any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
    // console.log(this.uploadedFiles);
}

  textAreaInput = "";
  name = "Angular";
  rating = { score: 5 };

  review = {
    rating: this.rating,
    discription: this.textAreaInput,
    images: [""],
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ReviewServiceService
  ) {}

  submitRevieww() {
    var review = {
      user_id: "623f640942114cd76d04d632",
      product_id: this.id,
      rating: this.rating.score,
      description: this.textAreaInput,
    };
    // console.log(review);
    this.service.postReview(this.id, review,this.uploadedFiles).subscribe((response) => {
      // console.log("got response from backend." + response);
      this.router.navigate(["./product-page/" + this.id]);
    });
    // console.log(this.textAreaInput);

  }

  goBack(): void {
    this.router.navigate(["./product-page/" + this.id]);
  }
}
