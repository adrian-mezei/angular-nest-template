import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderOverlayComponent } from './components/loader-overlay/loader-overlay.component';
import { Overlay } from '@angular/cdk/overlay';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        LoaderComponent,
        LoaderOverlayComponent,
        LoginCallbackComponent,
        NotFoundComponent,
    ],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FontAwesomeModule],
    providers: [Overlay],
    bootstrap: [AppComponent],
})
export class AppModule {}
