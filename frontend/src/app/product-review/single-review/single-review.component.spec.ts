/* Authored by Rutu Joshi, B00897744, rt296393@dal.ca
 */import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReviewComponent } from './single-review.component';

describe('SingleReviewComponent', () => {
  let component: SingleReviewComponent;
  let fixture: ComponentFixture<SingleReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
