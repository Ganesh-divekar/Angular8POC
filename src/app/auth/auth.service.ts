import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { DatastorageService } from "../recipes/shared/datastorage.service";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router) {

    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiFVU-axN0umroY14Fy4IOJsNMkYfButo',
            { email: email, password: password, returnSecureToken: true })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiFVU-axN0umroY14Fy4IOJsNMkYfButo',
            { email: email, password: password, returnSecureToken: true })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer)
            clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occured."
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists'
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist'
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is invalid'
        }
        return throwError(errorMessage);

    }
    autoLogin() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationdate))
        if (loadedUser.token) {
            this.user.next(loadedUser)
            const expDuration = new Date(userData._tokenExpirationdate).getTime() - new Date().getTime();
            this.autoLogOut(expDuration);
        }


    }
    autoLogOut(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);

    }
    private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, id, token, expirationDate);
        this.user.next(user);
        this.autoLogOut(+expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}