import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [AppComponent, AuthComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, FontAwesomeModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
