import { Route } from '@angular/router';
import { SignOutComponent } from "src/app/modules/auth/sign-out/sign-out.component";

export const signOutRouting: Route[] = [
    {
        path: '',
        component: SignOutComponent,
    }
];
