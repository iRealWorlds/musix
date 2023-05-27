export class ArtistUpdateRequest {
    name?: string;
    description?: string|null;

    /**
     * AuthSessionCreateRequest constructor method.
     *
     * @param initial
     */
    constructor(initial?: Partial<ArtistUpdateRequest>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}
