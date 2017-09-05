import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { fadeInAnimation } from "../../../route.animation";
import { User } from "../../../tools/models/user";
import { AuthService } from "../../../tools/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class LoginComponent implements OnInit {

  private user: User;
  private email: string;
  private password: string;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  private login() {
    this._authService.login(this.email, this.password).subscribe(
      data_user => {
        this.user = data_user;
        this.router.navigate(['/todo']);
      },
      error => {
        let errorJson = error.json();
        this._toastrService.error(errorJson.error, "Error")
      }
    );
  }

}
