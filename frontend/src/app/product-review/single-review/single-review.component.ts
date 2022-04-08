/* Authored by Rutu Joshi, B00897744, rt296393@dal.ca */
import { Component, OnInit,Input } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.css']
})
export class SingleReviewComponent implements OnInit {
  @Input() otherreviews = [] as any;
  constructor() { }
 

  ngOnInit(): void {
  }

}
