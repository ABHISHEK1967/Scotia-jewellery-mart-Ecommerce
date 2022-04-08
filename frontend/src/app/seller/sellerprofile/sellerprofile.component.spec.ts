import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerprofileComponent } from './sellerprofile.component';

describe('SellerprofileComponent', () => {
  let component: SellerprofileComponent;
  let fixture: ComponentFixture<SellerprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
