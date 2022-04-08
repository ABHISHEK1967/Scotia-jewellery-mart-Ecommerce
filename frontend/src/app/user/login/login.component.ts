import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { GlobalService } from "src/app/shared/service/globalService";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginEmail: any;
  changepassform: FormGroup;
  forgotpassform: FormGroup;
  loginform: FormGroup;
  data: any;
  wrongPassword: boolean = false;
  wrongDetails: boolean = false;
  correctDetails: boolean = false;
  // ApiUrl:any="https://nodeapi-1.herokuapp.com/";
  ApiUrl: any = environment.url;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private globalService:GlobalService
  ) {
    this.loginform = this.formBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
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
    this.forgotpassform = this.formBuilder.group({
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("Login") == "true") {
      this.globalService.getLoggedInStatus();
      this.router.navigate(["/profile"]);
    }
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

  onSubmit() {
    this.wrongPassword = false;
    this.http
      .post<any>(this.ApiUrl + "/users/login", this.loginform.value)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.message == "Success") {
            sessionStorage.setItem("email", data.data.email);
            sessionStorage.setItem("UserId",data.data.id);
            sessionStorage.setItem("Login", "true");
            this.globalService.getLoggedInStatus();
            // this.router.navigate(["/profile"]);
            this.router.navigate(["/"]);
          }
        },
        (error) => {
          this.wrongPassword = true;
          console.log("oops", error.error.message);
        }
      );
  }

  forgotPassword() {
    console.log(this.forgotpassform.value);
    this.http
      .post<any>(
        this.ApiUrl + "/users/forgotpassdetails",
        this.forgotpassform.value
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.wrongDetails = false;
          this.correctDetails = true;
          this.forgotpassform.reset();
        },
        (err) => {
          this.wrongDetails = true;
          this.correctDetails = false;
          console.log("oops", err.error.message);
        }
      );
  }
}
