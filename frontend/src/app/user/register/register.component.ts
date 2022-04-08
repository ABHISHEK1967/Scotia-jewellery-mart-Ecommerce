import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  passmatch: boolean = false;
  registerform: FormGroup;
  submitted: boolean = false;
  regError: boolean = false;
  errorDetails: any;
  ApiUrl: any = environment.url;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerform = this.formBuilder.group(
      {
        firstname: new FormControl("", Validators.required),
        lastname: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        phone: new FormControl("", [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(8),
        ]),
        cpassword: new FormControl("", [Validators.required]),
      },
      {
        validators: this.MustMatch("password", "cpassword"),
      }
    );
  }

  ngOnInit(): void {}

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
    this.http
      .post<any>(this.ApiUrl + "/users/register", this.registerform.value)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.message == "Success") {
            sessionStorage.setItem("email", data.data.email);
            sessionStorage.setItem("UserId",data.data.id);
            sessionStorage.setItem("Login", "true");
            this.router.navigate(["/profile"]);
          }
        },
        (error) => {
          console.log("oops", error.error.message);
          this.regError = true;
          this.errorDetails = error.error.message;
        }
      );
  }
}
