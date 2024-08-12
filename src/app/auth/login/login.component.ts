import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared-module/models/user';
import { AuthService } from '../authService/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: User = new User();
  token: any;
  show = false;
  loginDisabled = false;
  lastServiceErrorTime: number = 0;
  loginForm = new FormGroup({
    userName: new FormControl(this.login.userName, [Validators.required]),
    password: new FormControl(this.login.password, [Validators.required])
  })

  constructor(private _aS: AuthService,
    private router: Router,
    private _toastS: ToastrService
  ) { }

  ngOnInit(): void {

  }

  loginguser: any;
  userloginname: any;

  get lF() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if(this.loginForm.valid)
    
    if(!this.loginDisabled){
      this.loginDisabled = true;
    {
      const loginData = {
        userName: this.loginForm?.get('userName')?.value,
        password: this.loginForm?.get('password')?.value,
        rememberMe:true
      };
      this._aS.doLogout();
      this._aS.signIn(loginData).subscribe(
        (res: any) => {
          this.loginDisabled = false;
          if (res) {
            console.log("Login response:", res);
            localStorage.setItem('access_token', res?.loginResponse?.loginResponse?.accessToken);
            localStorage.setItem('username', res?.loginResponse?.loginResponse?.username);

            // const decodeToken = this._aS.decodeToken(res.data);
            // console.log(decodeToken);
            this.router.navigateByUrl('/bot/analytics/bot-analytics');
            const toasterObject = { isShown: true, isSuccess: true, toastHeading: "Success", toastParagrahp: "Login Successfully!" }
            this._toastS.success("Login Successfully!", "Success",{
              timeOut: 3000,
            })
            // this._toastS.updateToastData(toasterObject)
            // this._toastS.hide();
          }
          if (res.statuscode === 400) {
            const toasterObject = { isShown: true, isSuccess: false, toastHeading: "Failed", toastParagrahp: "Inavlid Username or Password!" }
            // this._toastS.error()
            // this._toastS.hide();
            // this.router.navigateByUrl('/auth/login');
          }

        }, (error: any) => {
          console.error("Internal Server Error", error);
          this.loginDisabled = false;
          this.lastServiceErrorTime = this.lastServiceErrorTime || 0;
            const now = Date.now();
            if (now - this.lastServiceErrorTime > 3000) {
            const toasterObject = { isShown: true, isSuccess: false, toastHeading: "Failed", toastParagrahp: "Internal Server Error!" }
            this._toastS.error(error.error, '', {
            timeOut: 3000,
          })
          this.lastServiceErrorTime = now;
        }
          // this._toastS.updateToastData(toasterObject)
          // this._toastS.hide();
      });
    }
  }
    else{
      this.markFormGroupTouched(this.loginForm)
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
  password() {
    this.show = !this.show;
  }

}
