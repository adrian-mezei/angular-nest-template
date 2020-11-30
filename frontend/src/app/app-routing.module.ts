import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent as LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const enum RouteValues {
    HOME = '',
    LOGIN = 'login',
    LOGIN_GOOGLE_CALLBACK = 'login/google/callback',
}

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: RouteValues.LOGIN,
        component: LoginComponent,
    },
    {
        path: RouteValues.LOGIN_GOOGLE_CALLBACK,
        component: LoginCallbackComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }, // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
