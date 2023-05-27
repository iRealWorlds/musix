import { Injectable } from '@angular/core';
import { EnvironmentConfig } from "src/app/core/environment/environment.config.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService  {

  /**
   * ApiService constructor method.
   *
   * @param environment
   */
  constructor(protected readonly environment: EnvironmentConfig) { }

  /**
   * Build a URI for accessing a given API endpoint.
   *
   * @param segments
   */
  protected buildApiEndpointUri(segments: string[]|string): string {
    // Normalize the segments
    if (!Array.isArray(segments)) {
      segments = [segments];
    }

    // Add the base api uri
    segments.unshift(this.environment.api.baseUri);

    // Trim slashes from the segments
    segments = segments.map(segment => segment.replace(/\/+$/, ''));
    segments = segments.map(segment => segment.replace(/^\/+/, ''));

    console.debug(segments);

    // Glue the segments together
    return segments.filter(segment => segment?.length).join('/');
  }
}
