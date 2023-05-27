import { Route } from '@angular/router';
import { SignUpComponent } from "src/app/modules/auth/sign-up/sign-up.component";

export const signUpRouting: Route[] = [
    {
        path: '',
        component: SignUpComponent,
    }
];
