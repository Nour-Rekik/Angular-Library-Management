import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AbonneListComponent } from './abonne-list/abonne-list.component';
import { AbonneFormComponent } from './abonne-list/abonne-form/abonne-form.component';
import { SingleAbonneComponent } from './abonne-list/single-abonne/single-abonne.component';
import { HttpClientModule } from '@angular/common/http';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginInterceptorProvider } from './interceptors/login-interceptor';

import { MenuComponent } from './menu/menu.component';
import { BackToMenuComponent } from './back-to-menu/back-to-menu.component';
import { EmpruntService } from './services/emprunt.service';
import { AbonneService } from './services/abonne.service';
import { AuthService } from './services/auth.service';
import { BookService } from './services/book.service';
import { UserService } from './services/user.service';
import { EmpruntListComponent } from './emprunt-list/emprunt-list.component';
import { EmpruntFormComponent } from './emprunt-list/emprunt-form/emprunt-form.component';
import { SingleEmpruntComponent } from './emprunt-list/single-emprunt/single-emprunt.component';

const appRoutes : Routes =[
  {path: 'auth/signup' , component : SignupComponent},
  {path: 'auth/signin' , component : SigninComponent},
  { path: 'books',  component: BookListComponent,canActivate: [AuthGuardService] },
  { path: 'books/new', component: BookFormComponent , canActivate: [AuthGuardService]},
  { path: 'books/view/:id', component: SingleBookComponent, canActivate: [AuthGuardService] },
  { path: 'membres', component: AbonneListComponent , canActivate: [AuthGuardService] },
  { path: 'membres/new', component: AbonneFormComponent , canActivate: [AuthGuardService]},
  { path: 'membres/view/:id', component: SingleAbonneComponent , canActivate: [AuthGuardService]},
  {path:'emprunt'  ,component : EmpruntListComponent, canActivate: [AuthGuardService]},
  {path:'emprunt/new'  ,component : EmpruntFormComponent , canActivate: [AuthGuardService]},
  {path:'emprunt/view/:id'  ,component : SingleEmpruntComponent, canActivate: [AuthGuardService]},
  { path: '', component:MenuComponent },
  { path: '**', redirectTo: '',canActivate: [AuthGuardService] },
]
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    BookFormComponent,
    SingleBookComponent,
    BookListComponent,
    HeaderComponent,
    AbonneFormComponent,
    AbonneListComponent,
    SingleAbonneComponent,
    MenuComponent,
    BackToMenuComponent,
    EmpruntListComponent,
    EmpruntFormComponent,
    SingleEmpruntComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardService,
    LoginInterceptorProvider,
  EmpruntService,
  AbonneService,
  AuthService ,
  BookService,
  UserService

],
  bootstrap: [AppComponent]
})
export class AppModule { }
