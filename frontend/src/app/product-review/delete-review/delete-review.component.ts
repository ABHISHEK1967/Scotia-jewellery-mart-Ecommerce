/* Authored by Rutu Joshi, B00897744, rt296393@dal.ca */
import { Component, OnInit,Input} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ReviewServiceService } from '../services/review-service.service';

@Component({
  selector: 'app-delete-review',
  templateUrl: './delete-review.component.html',
  styleUrls: ['./delete-review.component.css']
})
export class DeleteReviewComponent implements OnInit {
  @Input() ureviews = [] as any;
  id:any;

  constructor(private service: ReviewServiceService,
    private router: Router,
    private route: ActivatedRoute, ) {
    
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];


  }

  deleteReview(ureview:any,index:any){
    console.log(ureview);
    this.service.deleteReview(ureview._id).subscribe((response)=>{
      this.ureviews.splice(index,1);
      console.log("review deleted" + response);
     // this.router.navigate(['./product-page/'+this.id]);
      
  });
 
  }

}
