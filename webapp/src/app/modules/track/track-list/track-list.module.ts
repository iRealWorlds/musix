import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TrackListComponent } from './track-list.component';
import { RouterModule } from "@angular/router";
import { trackListRouting } from "src/app/modules/track/track-list/track-list.routing";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";



@NgModule({
  declarations: [
    TrackListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(trackListRouting),
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NgOptimizedImage
  ]
})
export class TrackListModule { }
