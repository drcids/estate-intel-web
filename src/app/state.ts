import { Injectable } from '@angular/core';
import { BehaviorSubject } from  'rxjs';

import { User } from 'src/app/interface/user';

@Injectable({
    providedIn: 'root'
})
export class State {
    
    public authenticatedUser: BehaviorSubject<User>  = new BehaviorSubject<User>(<User>{});

    public getAuthenticatedUser(){

        return this.authenticatedUser.asObservable();

    }
    public setAuthenticatedUser(user: User){

        this.authenticatedUser.next(user);

    }
    public resetAuthenticatedUser(){

        let resetOption = {} as User;
        this.setAuthenticatedUser(resetOption);

    }
}