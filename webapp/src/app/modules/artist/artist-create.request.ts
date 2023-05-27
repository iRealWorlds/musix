export class ArtistCreateRequest {
    name?: string;
    description?: string|null;

    /**
     * AuthSessionCreateRequest constructor method.
     *
     * @param initial
     */
    constructor(initial?: Partial<ArtistCreateRequest>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}
