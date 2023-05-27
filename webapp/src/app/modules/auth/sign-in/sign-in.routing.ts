import { Route } from '@angular/router';
import { SignInComponent } from "src/app/modules/auth/sign-in/sign-in.component";

export const signInRouting: Route[] = [
    {
        path: '',
        component: SignInComponent,
    }
];
