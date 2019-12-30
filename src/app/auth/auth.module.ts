import { NgModule } from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
    { path: 'auth', component: AuthComponent }
]
@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule,
        FormsModule,
        RouterModule.forChild(routes), NgxSpinnerModule],
    exports: [RouterModule]
})
export class AuthModule {

}