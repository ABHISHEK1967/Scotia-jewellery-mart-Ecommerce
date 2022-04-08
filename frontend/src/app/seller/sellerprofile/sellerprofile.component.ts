import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-sellerprofile',
  templateUrl: './sellerprofile.component.html',
  styleUrls: ['./sellerprofile.component.scss']
})
export class SellerprofileComponent implements OnInit {
  
  ApiUrl: any = environment.url;
  // // ApiUrl:any="https://nodeapi-1.herokuapp.com/";
  // ApiUrl:any="http://localhost:8080/api/v1/";
  productCategories: any[] | undefined;

  uploadedFiles: any[] = [];
  profileform:FormGroup;
  productform:FormGroup;
  sellerId:any;
   profileData:any;
   loginEmail:any;
   successAlertShow:boolean=false;
   failAlertShow:boolean=false;
   alertData:string="";
   heading:boolean=true;
   contentHeading:string="Profile";
   changepassform:FormGroup;
 
   constructor(private router:Router,
     private formBuilder:FormBuilder, private http: HttpClient) {
       this.changepassform=this.formBuilder.group({
         password: new FormControl('',[Validators.required,Validators.minLength(8)]),
         confirmpassword: new FormControl('',[Validators.required])
       }
       ,{ 
         validators: this.MustMatch('password', 'confirmpassword'),
       });
 
       this.profileform=this.formBuilder.group({
         firstname: new FormControl('',Validators.required),
         lastname: new FormControl('',Validators.required),
         email: new FormControl('',Validators.required),
         phone : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10) ]),
         address: new FormControl('',[Validators.required]),
         accountno: new FormControl('',[Validators.required]),
         sin: new FormControl('',[Validators.required]),
         bankname: new FormControl('',[Validators.required]),
       });

       this.productform=this.formBuilder.group({
        productname: new FormControl('',Validators.required),
        description:new FormControl('',Validators.required),
        About: new FormControl('',Validators.required),
        image: new FormControl('',Validators.required),
        brand : new FormControl('',[Validators.required]),
        price: new FormControl('',[Validators.required]),
        category: new FormControl('',[Validators.required]),
        stock: new FormControl('',[Validators.required]),
        producttype: new FormControl('',[Validators.required]),
      });
 
      }
 
   ngOnInit(): void {
     if(sessionStorage.getItem('SellerLogin')=="true")
     {
       this.loginEmail=sessionStorage.getItem('SellerEmail');
       this.sellerId=sessionStorage.getItem('sellerId');
       this.http.get<any>(this.ApiUrl+'/sellers/profile/'+this.sellerId ).subscribe(data => {
              //console.log(data);
              this.profileData=data.data
              this.profile()
           },
           error => {
             console.log('Unable to fetch profile', error.error.message);
             this.failAlertShow=true;
              this.alertData=error.error.message;
              this.router.navigate(['/seller-login']);
         });
         this.getProductsCategory()
     }
     else
     {
       //alert('Please Login');
       this.router.navigate(['/seller-login']);
     }
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


  getProductsCategory() {
  
    this.http.get<any>(this.ApiUrl+'/category/getCategoryDetails').subscribe(data => {
      console.log(data);
      this.productCategories=data.categories 
   },
   error => {
    console.log('Unable to get Products Category', error.error.message);
    
 }
   )
}
 
   logout(){
     sessionStorage.removeItem('SellerLogin');
     sessionStorage.removeItem('sellerId')
     this.router.navigate(['/seller-login']);
   }
 
   changePassword(){
     var newData:any={
       "email":this.loginEmail,
       "password":this.changepassform.value.password
     }
     this.http.put<any>(this.ApiUrl+'/sellers/changepassword',newData).subscribe(data => {
              //console.log(data);
              this.successAlertShow=true;
              this.alertData="Password Changed Successfully"
           },
           error => {
            // console.log('Unable to update password', error.error.message);
            this.failAlertShow=true;
            this.alertData=error.error.message;
         }
           )
   }
 
   profile(){
     this.contentHeading="Profile";
     this.editUserDetails(this.profileData);
   }
   viewOrders(){
     this.contentHeading="Orders";
   }
   listProducts(){
     this.contentHeading="Products";
   }
   addProduct(){
     this.contentHeading="Add New Product";
   }
   onUpdate(){
 
     // alert("Updating");
     // console.log(this.profileform.value);
     this.http.put<any>(this.ApiUrl+'/sellers/editprofile',this.profileform.value).subscribe(data => {
       //console.log(data);
       this.profileData=data.data
       this.editUserDetails(data.data);
       this.successAlertShow=true;
       this.alertData="Profile updated Successfully"
    },
    error => {
      //console.log('Unable to update profile details', error.error.message);
      this.failAlertShow=true;
       this.alertData=error.error.message;
  }
    )
   }
   editUserDetails(userObj:any){
     this.profileform.patchValue({
       firstname: userObj.firstname,
       lastname: userObj.lastname,
       email: userObj.email,
       phone :userObj.phone,
       sin: userObj.sin,
       bankname: userObj.bankname,
       accountno: userObj.accountno,
       address:userObj.seller_address
 
     })
   }

   onUpload(event:any) {
   // alert("Upload")
    this.uploadedFiles = event.target.files
  }
 
   onAddProduct(){
   // alert("Adding Product");
    // console.log(this.productform.value);
    // console.log(this.uploadedFiles);
    this.productform.value.image=this.uploadedFiles
    console.log(this.productform.value);
  //   this.http.put<any>(this.ApiUrl+'sellers/editprofile',this.profileform.value).subscribe(data => {
  //     //console.log(data);
  //     this.profileData=data.data
  //     this.editUserDetails(data.data);
  //     this.successAlertShow=true;
  //     this.alertData="Profile updated Successfully"
  //  },
  //  error => {
  //    //console.log('Unable to update profile details', error.error.message);
  //    this.failAlertShow=true;
  //     this.alertData=error.error.message;
  // }
  //  )
  }


 }




