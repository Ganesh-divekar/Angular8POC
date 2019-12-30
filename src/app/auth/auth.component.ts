import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
@Component(
    {
        selector: 'app-auth',
        templateUrl: './auth.component.html'
    }
)
export class AuthComponent {
    isLoading: boolean = false;
    isLoginMode: boolean = true;
    error: string = '';
    constructor(private authService: AuthService, private spinner: NgxSpinnerService, private router: Router) {

    }

    switchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    submitForm(form: NgForm) {
        this.error = '';
        let email: string = form.value.name;
        let password: string = form.value.password;
        this.spinner.show();
        let observable: Observable<any>;
        if (!this.isLoginMode)
            observable = this.authService.signUp(email, password);
        else
            observable = this.authService.login(email, password);

        observable.subscribe(result => {
            this.spinner.hide();
            this.router.navigate(['/recipes']);
        }, error => {
            this.error = error;
            this.spinner.hide();
        })

    }
}