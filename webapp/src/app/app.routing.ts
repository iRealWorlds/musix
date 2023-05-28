import { Route } from '@angular/router';
import { AuthGuard } from "src/app/core/auth/auth.guard";
import { AppComponent } from "src/app/app.component";

export const appRouting: Route[] = [
  // Redirect '/' to '/home'
  { path: '', redirectTo: '/artists/list', pathMatch: 'full' },

  // Routes that require the user to be a guest
  {
    path: '',
    canActivate: [],
    children: [
      { path: 'auth/sign-in', loadChildren: () => import('src/app/modules/auth/sign-in/sign-in.module').then(m => m.SignInModule) },
      { path: 'auth/sign-up', loadChildren: () => import('src/app/modules/auth/sign-up/sign-up.module').then(m => m.SignUpModule) },
    ],
  },

  // Routes that require the user to be authenticated
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'auth/sign-out', loadChildren: () => import('src/app/modules/auth/sign-out/sign-out.module').then(m => m.SignOutModule) },
      { path: 'artists', loadChildren: () => import('src/app/modules/artist/artist.module').then(m => m.ArtistModule) },
      { path: 'tracks', loadChildren: () => import('src/app/modules/track/track.module').then(m => m.TrackModule) },
    ],
  },

  // Routes that do not care about authentication
  {
    path: '',
    children: [
      {
        path: 'home',
        component: AppComponent
      }
    ],

  },

  // Catch all route
  // { path: '**', pathMatch: 'full', component: NotFoundComponent },
];
