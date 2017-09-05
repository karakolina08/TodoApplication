import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { User } from "../models/user";
import { apiService } from "./api.service";
import { SuccessResponse } from "../models/successResponse";

@Injectable()
export class AuthService {

    // Variables 
    private _authUser : User;

    // Constructor
    constructor(
        private _apiService: apiService,
        private _router: Router,
    ) {}

    // private functions
    private saveCurrentUser(userReg : User){
        this._authUser = userReg;
        sessionStorage.setItem("currentUser", JSON.stringify(this._authUser));
    }

    // public functions 
    // Login function
    public login(email: string, password: string) : Observable<User> {
        // Declare parameters
        let params = { Email: email, Password: password};
        // Called api
        return this._apiService.apiPost("api/authService/login", JSON.stringify(params))
                .map(res =>  <User> (<SuccessResponse> res.json()).data )
                .do(this.saveCurrentUser);
    }

    public logout(){
        // get session and local user
        let sessionUser : User = JSON.parse(sessionStorage.getItem("currentUser"));
        // cleaning session user
        sessionStorage.removeItem("currentUser");
        
        return this._apiService.apiPost("api/authService/logout", null)
                .map(res => (<SuccessResponse> res.json()).data )               
    }

    public getInfoUser() : User{
        let userReg = JSON.parse(sessionStorage.getItem("currentUser"));
        return userReg;
    }

    public updateCurrentUser(userReg : User){
        let sessionCurrentUser = this.getInfoUser();
        sessionStorage.removeItem("currentUser");
        this.saveCurrentUser(userReg);
    }
}