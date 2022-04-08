import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-sellerregister',
  templateUrl: './sellerregister.component.html',
  styleUrls: ['./sellerregister.component.scss']
})
export class SellerregisterComponent implements OnInit {

  ApiUrl: any = environment.url;
//  // ApiUrl:any="https://nodeapi-1.herokuapp.com/";
//  ApiUrl:any="http://localhost:8080/api/v1/";
  sellerRegisterForm:FormGroup;
  regError:boolean=false;
  errorDetails:any;

  constructor( private formBuilder:FormBuilder,private router:Router, private http: HttpClient) {
    this.sellerRegisterForm=this.formBuilder.group({
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      cpassword: new FormControl('',[Validators.required]) ,
      phone:  new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      sin: new FormControl('',[Validators.required]),
      bankname: new FormControl('',[Validators.required]),
      zipcode: new FormControl('',[Validators.required]),
      state: new FormControl('',[Validators.required]),
      accountno: new FormControl('',[Validators.required]),
      accounttype: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),
      seller_address: new FormControl('',[Validators.required])
    },{ 
      validators: this.MustMatch('password', 'cpassword'),
    })
   }


   MustMatch(controlName:string, confirmcontrolName:string)
  {
    return(formGroup:FormGroup)=>{
      const control =formGroup.controls[controlName];
      const confirmControl =formGroup.controls[confirmcontrolName];
      if(confirmControl.errors &&  !confirmControl.errors['MustMatch']){
        return
      }
      if(control.value !==confirmControl.value){
        confirmControl.setErrors({MustMatch:true})
      }
      else{
        confirmControl.setErrors(null)
      }

    }
  }

  ngOnInit(): void {
  }


  onSubmit(){
    console.log(this.sellerRegisterForm.value);
    this.http.post<any>(this.ApiUrl+'/sellers/register', this.sellerRegisterForm.value).subscribe(data => {
      console.log(data);
      if(data.message=="Success")
      {
       sessionStorage.setItem('SellerEmail',data.data.email);
       sessionStorage.setItem('sellerId',data.data.id);
       sessionStorage.setItem('SellerLogin',"true");
       this.router.navigate(['/seller-profile']);
      }
   },
   error => {
     console.log('oops', error.error.message);
     this.regError=true;
     this.errorDetails=error.error.message;
 }
   )
  }

}

