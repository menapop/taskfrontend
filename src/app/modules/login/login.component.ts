import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/shared-module/AuthService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validLogin = true;
  showLogin = false;
  form = this.fb.group({
    Email: [null, Validators.required],
    Password: [null, Validators.required],
    Application: 1
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private route: Router
  ) {    
}

  ngOnInit() {
    if (this.authService.isLogin()) {
      this.route.navigate(['/']);
    } else {
      this.authService.refreshCurrentToken().then(value => {
        if (value) {
          this.route.navigate(['/']);
        } else {
          this.showLogin = true;
          this.loadScript();
        }
      });
    }
  }

  public loadScript() {
    let xxx;
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = './assets/js/canvas.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
    Submit()  {
    this.validLogin = true;
    debugger;
     if (this.form.valid) {
      this.authService.login(this.form.value).then(value => {
       
        this.validLogin = value;
        if (this.validLogin) {
            this.route.navigate(['/']);
      }
    });
  }
  }
}