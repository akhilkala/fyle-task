import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';

import { AppComponent } from './app.component';
import { UserComponent } from './pages/user/user.component';
import { RepoCardComponent } from './components/repo-card/repo-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import player from 'lottie-web';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'user/:username',
    component: UserComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RepoCardComponent,
    PaginationComponent,
    HomeComponent,
    LoadingComponent,
    ErrorComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    LottieModule.forRoot({ player: () => player }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
