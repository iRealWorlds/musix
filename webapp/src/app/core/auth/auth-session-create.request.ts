export class AuthSessionCreateRequest {
    email?: string;
    password?: string;

    /**
     * AuthSessionCreateRequest constructor method.
     *
     * @param initial
     */
    constructor(initial?: Partial<AuthSessionCreateRequest>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}
