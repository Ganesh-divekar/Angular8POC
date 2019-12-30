import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingModule } from './shopping-list/shopping.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { StoreModule } "@ngrx/store";
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' }
  , { path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShoppingModule,
    AuthModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
