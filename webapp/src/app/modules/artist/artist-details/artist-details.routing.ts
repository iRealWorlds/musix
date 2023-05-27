import { Route } from "@angular/router";
import { ArtistDetailsComponent } from "src/app/modules/artist/artist-details/artist-details.component";
import { ArtistDetailsResolver } from "src/app/modules/artist/artist-details.resolver";

export const artistDetailsRouting: Route[] = [
    {
        path: ':artistKey',
        component: ArtistDetailsComponent,
        resolve: {
            artist: ArtistDetailsResolver
        }
    }
]
