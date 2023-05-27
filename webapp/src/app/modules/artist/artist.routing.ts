import { Route } from "@angular/router";

export const artistRouting: Route[] = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {
        path: 'list',
        loadChildren: () => import('src/app/modules/artist/artist-list/artist-list.module').then(m => m.ArtistListModule),
    },
    {
        path: 'create',
        loadChildren: () => import('src/app/modules/artist/artist-create/artist-create.module').then(m => m.ArtistCreateModule),
    },
    {
        path: 'details',
        loadChildren: () => import('src/app/modules/artist/artist-details/artist-details.module').then(m => m.ArtistDetailsModule),
    },
];
