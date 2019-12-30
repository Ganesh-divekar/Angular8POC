import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatastorageService } from '../recipes/shared/datastorage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;
  isAuthenticated: boolean = false;
  constructor(private dtService: DatastorageService, private authService: AuthService) {

  }

  saveData() {
    this.dtService.saveRecipes().subscribe((response => {
      console.log(response);
    }));
  }

  fetchData() {
    this.dtService.fetchRecipes().subscribe();
  }

  logOut() {
    this.authService.logOut();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

}
