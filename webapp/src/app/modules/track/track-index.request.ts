export class TrackIndexRequest {
  query?: string;

  /**
   * AuthSessionCreateRequest constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<TrackIndexRequest>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }
}
