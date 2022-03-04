import { Component } from '@angular/core';
import { State } from 'src/app/state'
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from './interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isAuthenticated: boolean = false;
  public user: User = {} as User;

  constructor(
    private authService: AuthService,
    private appState: State,
    private router: Router, 
  ){
    
    this.appState.getAuthenticatedUser().subscribe((authenticatedUser: User)  => {

      if(authenticatedUser && authenticatedUser.id){

        this.isAuthenticated = true;
        this.user = authenticatedUser;

      }else{
        
        this.isAuthenticated = false;

      }

    });

  }

  public logout() {

    this.authService.logout()
    this.router.navigate(['login']);
    
  }
}
