import { Component, OnInit } from '@angular/core';
import { LoginDetails, TestUser, User } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { State } from 'src/app/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toast: MatSnackBar, 
    private router: Router, 
    private appState: State,
  ) { }

  ngOnInit(): void {
  }

  public showNotification(message: string){

    this.toast.open(message, 'x' ,{duration: 3000});

  }

  public login() {

    let details: LoginDetails = {
      email: 'test@gmail.com',
      password: 'test'
    }

    let resp = this.credentialCheck(details);
    if(resp.status){

      localStorage.setItem('estate_user', JSON.stringify(resp.user));
      localStorage.setItem('estate_token', JSON.stringify(resp.token));
      
      this.appState.setAuthenticatedUser(resp.user);
      this.router.navigate(['home']);

    }else{

      this.showNotification('Incorrect email or password')

    }
    
    
  }

  public credentialCheck(details: LoginDetails) {

    let user: TestUser = {
      id: 1,
      name: 'Adyle Trevor',
      email: 'test@gmail.com',
      password: 'test',
      address: 'Test Address'
    }

    let response = {
      status: false,
      user: {} as User,
      token: ''
    }

    if(user.email == details.email && user.password == details.password){

      response.status = true;
      response.user =  {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
      }
      response.token = this.authService.generateToken();

    }

    return response;

  }

}
