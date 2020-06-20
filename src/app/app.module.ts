import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CaseInsensitiveMatcher } from './utils/case-insensitive-matcher';
import { Route } from '@angular/compiler/src/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiModule } from './services/api/api.module';

export const commonRoutes: Routes = [
  <Route>{
    matcher: CaseInsensitiveMatcher.matcher,
    matcherPath: 'linhas',
    loadChildren: () => import('./pages/lines/lines.module').then(m => m.LinesModule)
  },
  { path: '**', loadChildren: () => import('./pages/lines/lines.module').then(m => m.LinesModule) }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    RouterModule.forRoot(commonRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
