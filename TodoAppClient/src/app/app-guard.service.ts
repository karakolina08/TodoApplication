import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./tools/services/auth.service";
import { User } from "./tools/models/user";

@Injectable()
export class AppGuard implements CanActivate {
        
    // variables 
    private _currentUser: User;
    private userRoots = ["todo"];

    constructor(
        private _router: Router,
        private _authService: AuthService,
    ){}


    // Guards
    canActivate(route: ActivatedRouteSnapshot): boolean {
        this._currentUser =  this._authService.getInfoUser();

        if(!this._currentUser){
            this._router.navigate(["/login"]);
            return false;
        } else{
            // path of url
            let adminPath = route.url[0].path;
            
            // User
            let canAccess = false;
            for(var idx in this.userRoots){
                if(adminPath == this.userRoots[idx]) canAccess = true;
            }
            // The user can't access
            if(!canAccess) {
                this._router.navigate(["/login"]);
                return false;
            }
        }

        return true;
    }
    
}