export class TrackCreateRequest {
  name?: string;
  publishedAt?: Date|string;
  artistKey?: number;

  /**
   * AuthSessionCreateRequest constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<TrackCreateRequest>) {
    if (initial) {
      Object.assign(this, initial);
      if (typeof initial.publishedAt === 'string') {
        if (/\d\d\d\d-\d\d-\d\d/.test(initial.publishedAt)) {
          const [year, month, day] = initial.publishedAt.split('-').map(segment => parseInt(segment));
          this.publishedAt = new Date(Date.UTC(year, month - 1, day))
        }
      }
    }
  }
}
