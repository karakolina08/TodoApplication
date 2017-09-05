import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../../route.animation";
import { Router } from "@angular/router";
import { UserService } from "../../../tools/services/user.service";
import { User } from "../../../tools/models/user";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class RegisterComponent implements OnInit {

  private newUser: User;
  private name: string;
  private email: string;
  private password: string;
  private passwordConfirm: string;

  constructor(
    private _router: Router,
    private _userService : UserService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  // register() {
  //   this.router.navigate(['/']);
  // }

  register() {
    if(this.password != this.passwordConfirm){
      this._toastrService.error("The 'Password' and 'Password (Confirm)' aren't equal", "Validation Error");
    } else {
      let user : any = {name: this.name, email: this.email, password: this.password};
      this._userService.createNewUser(user).subscribe(
        data_user => {
          this.newUser = data_user;
          this.completeRegister(this.newUser);
        },
        error => {
          let errorJson = error.json();
          this._toastrService.error(errorJson.error, "Error");
        }

      );
    }
  }

  // Complete register of the new user
  private completeRegister(newUser: User){

    let title = "Hi " + newUser.name;
    let content = "You were successfully registered!";
    this._toastrService.success(content, title);

    // redirect to login
    this._router.navigate(['/']);
  }

}
