import { Route } from "@angular/router";
import { TrackListComponent } from "src/app/modules/track/track-list/track-list.component";
import { TrackIndexResolver } from "src/app/modules/track/track-index.resolver";

export const trackListRouting: Route[] = [
  {
    path: '',
    component: TrackListComponent,
    resolve: {
      tracks: TrackIndexResolver
    }
  }
]
