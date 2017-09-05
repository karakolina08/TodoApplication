import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiService } from "./api.service";
import { User } from "../models/user";
import { SuccessResponse } from "../models/successResponse";

@Injectable()
export class UserService {

    // Variables 
    public filterUserGridExternal: any;
    public filterUserGrid: any;

    // Constructor
    constructor(private _apiService: apiService) {}

    // create new user
    createNewUser(newUser: any) : Observable<User>{
        return this._apiService.apiPost("api/userService/create", JSON.stringify(newUser))
                .map(res =>  <User> (<SuccessResponse> res.json()).data );
    }

}