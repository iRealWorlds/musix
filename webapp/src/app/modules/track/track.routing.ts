import { Route } from "@angular/router";

export const trackRouting: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadChildren: () => import('src/app/modules/track/track-list/track-list.module').then(m => m.TrackListModule),
  },
  {
    path: 'create',
    loadChildren: () => import('src/app/modules/track/track-create/track-create.module').then(m => m.TrackCreateModule),
  },
  {
    path: 'details',
    loadChildren: () => import('src/app/modules/track/track-details/track-details.module').then(m => m.TrackDetailsModule),
  },
];
