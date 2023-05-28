export class ArtistIndexRequest {
  query?: string;

  /**
   * AuthSessionCreateRequest constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<ArtistIndexRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
