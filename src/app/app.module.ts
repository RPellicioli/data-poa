import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CaseInsensitiveMatcher } from './utils/case-insensitive-matcher';
import { Route } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertModule } from './components/alert/alert.module';

export const commonRoutes: Routes = [
  <Route>{
    matcher: CaseInsensitiveMatcher.matcher,
    matcherPath: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path: '**', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlertModule,
    RouterModule.forRoot(commonRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
