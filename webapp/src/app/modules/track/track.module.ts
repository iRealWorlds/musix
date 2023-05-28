import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TrackIndexResolver } from "src/app/modules/track/track-index.resolver";
import { TrackDetailsResolver } from "src/app/modules/track/track-details.resolver";
import { trackRouting } from "src/app/modules/track/track.routing";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(trackRouting)
  ],
  providers: [
    TrackIndexResolver,
    TrackDetailsResolver,
  ]
})
export class TrackModule { }
