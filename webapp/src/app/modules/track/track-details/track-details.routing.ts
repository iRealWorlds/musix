import { Route } from "@angular/router";
import { TrackDetailsComponent } from "src/app/modules/track/track-details/track-details.component";
import { TrackDetailsResolver } from "src/app/modules/track/track-details.resolver";

export const trackDetailsRouting: Route[] = [
  {
    path: ':trackKey',
    component: TrackDetailsComponent,
    resolve: {
      track: TrackDetailsResolver,
    }
  }
]
