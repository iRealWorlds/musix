import { Route } from "@angular/router";
import { ArtistCreateComponent } from "src/app/modules/artist/artist-create/artist-create.component";

export const artistCreateRouting: Route[] = [
    {
        path: '',
        component: ArtistCreateComponent
    }
];
