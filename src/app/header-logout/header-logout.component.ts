import { Component } from '@angular/core';
import { AccountServiceService } from '../account-service.service';

@Component({
  selector: 'app-header-logout',
  templateUrl: './header-logout.component.html',
  styleUrls: ['./header-logout.component.css']
})
export class HeaderLogoutComponent {
  constructor(private authService: AccountServiceService) { }
  signOut() {
    // Call the AuthService to destroy the token and sign out the user
    this.authService.removeToken();
  }
}
