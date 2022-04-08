import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  ApiUrl: any = environment.url;
  profileform: FormGroup;
  userAddress: any;
  profileData: any;
  loginEmail: any;
  userId:any;
  successAlertShow: boolean = false;
  failAlertShow: boolean = false;
  alertData: string = "";
  changepassform: FormGroup;
  newaddressform: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.changepassform = this.formBuilder.group(
      {
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmpassword: new FormControl("", [Validators.required]),
      },
      {
        validators: this.MustMatch("password", "confirmpassword"),
      }
    );

    this.profileform = this.formBuilder.group({
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      email: new FormControl(""),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });

    this.newaddressform = formBuilder.group({
      address: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      zip: new FormControl("", Validators.required),
      country: new FormControl("", [Validators.required]),
      email: new FormControl(""),
      userid: new FormControl("")
    });
  }

  MustMatch(controlName: string, confirmcontrolName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const confirmControl = formGroup.controls[confirmcontrolName];
      if (confirmControl.errors && !confirmControl.errors["MustMatch"]) {
        return;
      }
      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ MustMatch: true });
      } else {
        confirmControl.setErrors(null);
      }
    };
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("Login") == "true") {
      this.loginEmail = sessionStorage.getItem("email");
      this.userId=sessionStorage.getItem("UserId");
      //alert(this.userId);
      this.http
        .get<any>(this.ApiUrl + "/users/profile/" + this.userId)
        .subscribe(
          (data) => {
            //console.log(data);
            this.profileData = data.data;
            this.editUserDetails(data.data);
          },
          (error) => {
            //console.log('Unable to fetch profile', error.error.message);
            this.failAlertShow = true;
            this.alertData = error.error.message;
            this.router.navigate(["/login"]);
          }
        );

      this.getAllAddressOfUser(this.userId);
    } else {
      //alert('Please Login');
      this.router.navigate(["/login"]);
    }
  }

  logout() {
    sessionStorage.removeItem("Login");
    sessionStorage.removeItem("UserId");
  }

  changePassword() {
    var newData: any = {
      email: this.loginEmail,
      password: this.changepassform.value.password,
    };
    this.http.put<any>(this.ApiUrl + "/users/changepassword", newData).subscribe(
      (data) => {
        //console.log(data);
        this.successAlertShow = true;
        this.alertData = "Password Changed Successfully";
      },
      (error) => {
        // console.log('Unable to update password', error.error.message);
        this.failAlertShow = true;
        this.alertData = error.error.message;
      }
    );
  }

  onUpdate() {
    //alert("Updating");
    //console.log(this.profileform.value);
    this.http
      .put<any>(this.ApiUrl + "/users/editprofile", this.profileform.value)
      .subscribe(
        (data) => {
          //console.log(data);
          this.profileData = data.data;
          this.editUserDetails(data.data);
          this.successAlertShow = true;
          this.alertData = "Profile updated Successfully";
        },
        (error) => {
          //console.log('Unable to update profile details', error.error.message);
          this.failAlertShow = true;
          this.alertData = error.error.message;
        }
      );
  }

  editUserDetails(userObj: any) {
    this.profileform.patchValue({
      firstname: userObj.firstname,
      lastname: userObj.lastname,
      email: userObj.email,
      phone: userObj.phone,
    });
  }

  getAllAddressOfUser(email: any) {
    this.http.get<any>(this.ApiUrl + "/users/address/all/" + email).subscribe(
      (data) => {
        this.userAddress = data.data;
      },
      (error) => {
        //console.log('Unable to fetch user address', error.error.message);
        this.failAlertShow = true;
        this.alertData = error.error.message;
      }
    );
  }

  addNewAddress() {
    //alert("save new address called");
    this.newaddressform.value.email = this.profileData.email;
    this.newaddressform.value.userid=this.userId
    this.http
      .post<any>(this.ApiUrl + "/users/address/add", this.newaddressform.value)
      .subscribe(
        (data) => {
          //console.log(data);
          this.successAlertShow = true;
          this.alertData = "Address Added Successfully";
          this.getAllAddressOfUser(this.userId);
          this.newaddressform.reset();
        },
        (error) => {
          //console.log('Unable to add address', error.error.message);
          this.failAlertShow = true;
          this.alertData = error.error.message;
        }
      );
  }

  deleteAddress(addressId: any) {
    //alert(addressId);
    this.http
      .delete<any>(this.ApiUrl + "/users/address/delete/" + addressId)
      .subscribe(
        (data) => {
          this.successAlertShow = true;
          this.alertData = "Address Added Successfully";
          this.getAllAddressOfUser(data.id);
        },
        (error) => {
          //console.log('Unable to add address', error.error.message);
          this.failAlertShow = true;
          this.alertData = error.error.message;
        }
      );
  }
}
