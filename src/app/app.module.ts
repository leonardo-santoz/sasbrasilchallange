import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { HttpService } from './shared/interceptors/http.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    AuthModule,
    MainModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
