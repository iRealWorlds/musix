import {NgModule, Optional, SkipSelf} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { environment } from "src/environments/environment";
import { EnvironmentConfig } from "src/app/core/environment/environment.config.model";
import { AuthModule } from "src/app/core/auth/auth.module";


@NgModule({
  imports: [
    HttpClientModule,
    AuthModule
  ],
  providers: [
    {
      provide: EnvironmentConfig,
      useValue: environment,
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500
      }
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        timezone: '+0300'
      }
    }
  ]
})
export class CoreModule {
  /**
   * Constructor
   */
  constructor(
      @Optional() @SkipSelf() parentModule?: CoreModule
  ) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }
  }
}
