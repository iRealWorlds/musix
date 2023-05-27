import { Route } from "@angular/router";
import { ArtistListComponent } from "src/app/modules/artist/artist-list/artist-list.component";
import { ArtistIndexResolver } from "src/app/modules/artist/artist-index.resolver";

export const artistListRouting: Route[] = [
    {
        path: '',
        component: ArtistListComponent,
        resolve: {
            artists: ArtistIndexResolver
        }
    }
]
