import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';

import { User } from 'src/app/interface/user';
import { State } from 'src/app/state'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticatedUser = {} as User;

  constructor(
    private jwtHelper: JwtHelperService,
    private appState: State
  ) { }

  public checkAuthenticated() {

    let authenticated =  false;

    let locatStorageUser:any = localStorage.getItem('estate_user')
    let user = JSON.parse(locatStorageUser);
    if(user && user.id){

      let locatStorageToken:any = localStorage.getItem('estate_token')
      if(this.checkToken(locatStorageToken) ==  false){

        this.appState.setAuthenticatedUser(user);
        authenticated =  true;

      }
      
    }

    return authenticated;
  }

  public logout() {

    localStorage.removeItem('estate_user');
    localStorage.removeItem('estate_token');

    this.appState.resetAuthenticatedUser();

  }

  public checkToken(token: string) {

    if(this.jwtHelper.isTokenExpired(token) == false){

      return false;

    }else{

      return true;

    }

  }

  public generateToken() {

    var header = {
      "alg": "HS256",
      "typ": "JWT"
    };
    
    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = this.base64url(stringifiedHeader);

    let payload = { 
      iss: 'Estate Intel Test',
      iat: Math.round(new Date(Date.now()).getTime() / 1000),
      exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000),
      aud: 'Test',
      sub: 'Test'
    }
    
    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    var encodedData = this.base64url(stringifiedData);
    
    var token = encodedHeader + "." + encodedData;

    return this.signToken(token)
    
  }

  public signToken(token: string) {

    var secret = "secret";

    var signature: any = CryptoJS.HmacSHA256(token, secret);
    signature = this.base64url(signature);

    return token + "." + signature;
    
  }

  public base64url(source: any) {
    // Encode in classical base64
    let encodedSource = CryptoJS.enc.Base64.stringify(source);
  
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');
  
    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
  
    return encodedSource;
  }
  
}
