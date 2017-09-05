import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../tools/services/auth.service";
import { UserService } from "../../../tools/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../../tools/models/user";

@Component({
  selector: 'ms-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;
  private _currentUser : User;

  constructor(
    private _router: Router,
    private _authService: AuthService, 
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this._currentUser =  this._authService.getInfoUser();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout(){
    this._authService.logout().subscribe(
      null, null, () => this._router.navigate(['/login'])
    );   
  }

}
