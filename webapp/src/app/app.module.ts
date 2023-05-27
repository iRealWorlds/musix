import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "src/app/app.component";
import { CoreModule } from "src/app/core/core.module";
import { appRouting } from "src/app/app.routing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { identityLoadedGuard } from "src/app/core/auth/identity-loaded.guard";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        // Angular modules
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([{
            path: '',
            canActivate: [identityLoadedGuard],
            children: appRouting
        }]),

        // Core module
        CoreModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
