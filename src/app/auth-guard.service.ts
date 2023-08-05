import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountServiceService } from './account-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private accountService: AccountServiceService, private router: Router) {}

  canActivate() {
    debugger;
    this.accountService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
      return true;
    } 
    else {
      this.router.navigate(['/login']);
      return false;
    }
  });
}
}