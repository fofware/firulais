import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Roles } from '../shared/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router ){}
/*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean
    | UrlTree> | Promise<boolean | UrlTree>
    | boolean | UrlTree
  {
    if ( this.authService.loggedIn() ) {
//      console.log('Autorizado');
      return true;
    }

    window.alert('Access Denied, Login is Required to Access This Page!');
    this.router.navigate(['/auth/signin']);
    return false;
  }
*/
  /**
   * Can this route be activated?
   * @param {ActivatedRouteSnapshot} route - The route.
   * @returns {Promise<boolean>} True if user is authenticated otherwise false
   */
  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedUserRoles = this.getRoutePermissions(route);
    return this.checkPermission(allowedUserRoles);
  }

  /**
   * Can this child route be activated?
   * @param {ActivatedRouteSnapshot} route - The route.
   * @returns {Promise<boolean>} True if user is authenticated otherwise false
   */
    public async canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
      const allowedUserRoles = this.getRoutePermissions(route);
      return this.checkPermission(allowedUserRoles);
    }

  /**
   * Can this route be loaded.
   * @returns {Promise<boolean>} True if user is authenticated otherwise false
   */
    public canLoad(): boolean {
      return this.checkPermission(null);
    }

    /**
     * Get allowed user roles from the route.
     * @param {ActivatedRouteSnapshot} route - The route.
     * @returns {string[]} All user roles that are allowed to access the route.
     */
    private getRoutePermissions(route: ActivatedRouteSnapshot): Roles[] {
      if (route.data && route.data.userRoles) {
        return route.data.userRoles as Roles[];
      }
      return null;
    }

    /**
     * Check if a user is authenticated
     * @param {string[]} allowedUserRoles - These user roles have the permissions to access the route.
     * @returns {Promise<boolean>} True if user is authenticated otherwise false
     */

    private checkPermission(allowedUserRoles: Roles[]): boolean {
//      const session =  this.authService.loggedIn();
      const user = this.authService.getUser();
      console.log('allowedUserRoles',allowedUserRoles)
      console.log('user', user)
      if( !allowedUserRoles ) return true;
      for (const role of user.roles) {
        for (const allowedRole of allowedUserRoles) {
          if (role.toLowerCase() === allowedRole.toLowerCase()) {
            return true;
          }
        }
      }
      return false
/*
      if (session) {
        if (!allowedUserRoles) {
          return true;   // if no user roles has been set, all user are allowed to access the route
        } else {
          return this.authService.getUserRoles().then((userRoles: string[]) => {
            if (this.authService.areUserRolesAllowed(userRoles, allowedUserRoles)) {
              return true;
            } else {
              this.router.navigateByUrl('/nopermission');
              return false;
            }
          });
        }
      } else { return false; }
*/
  }
}
