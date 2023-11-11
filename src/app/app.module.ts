import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { AdminAuthGuard } from './admin-auth-guard.service';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth-guard.service';
import { fakeBackendProvider, FakeBackendInterceptor } from './helpers/fake-backend';


export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    NoAccessComponent,
    NotFoundComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent },
      { path: '**', component: NotFoundComponent },

    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['/']
      }
    })
  ],
  providers: [
    OrderService,
    AuthService,
    FakeBackendInterceptor,
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
