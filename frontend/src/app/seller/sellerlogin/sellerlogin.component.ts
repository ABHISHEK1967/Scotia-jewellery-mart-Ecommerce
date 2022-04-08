import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-sellerlogin',
  templateUrl: './sellerlogin.component.html',
  styleUrls: ['./sellerlogin.component.scss']
})
export class SellerloginComponent implements OnInit {

  sellerloginform:FormGroup;
  wrongPassword:boolean=false;
  forgotpassform:FormGroup;
  wrongDetails:boolean=false;
  correctDetails:boolean=false;
  ApiUrl: any = environment.url;
//  // ApiUrl:any="https://nodeapi-1.herokuapp.com/";
//  ApiUrl:any="http://localhost:8080/api/v1/";
  constructor(private formBuilder:FormBuilder, private http: HttpClient,private router:Router) { 
    
    this.sellerloginform=this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });

    this.forgotpassform=this.formBuilder.group({
      phone: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    });
  }

  ngOnInit(): void {
  }
  // onSubmit(){
  //   this.wrongPassword=false;
  //   if(this.sellerloginform.value.email=="Pranav@gmail.com" && this.sellerloginform.value.password=="Pranavchauhan")
  //   {
  //     //alert("Login Successfull");
  //   }
  //   else{
  //     //alert("Wrong Password");
  //     this.wrongPassword=true;
  //   }
  // }
  onSubmit(){
    this.wrongPassword=false;
    this.http.post<any>(this.ApiUrl+'/sellers/login', this.sellerloginform.value).subscribe(data => {
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
          this.wrongPassword=true;
          console.log('oops', error.error.message);
      });
  }

  forgotPassword(){
    console.log(this.forgotpassform.value)
    this.http.post<any>(this.ApiUrl+'/sellers/forgotpassword',this.forgotpassform.value).subscribe(data => {
      console.log(data);
      this.wrongDetails=false;
      this.correctDetails=true;
      this.forgotpassform.reset();
   },
   err=>{
    this.wrongDetails=true;
    this.correctDetails=false;
    console.log('oops', err.error.message);
   });
  }
}
