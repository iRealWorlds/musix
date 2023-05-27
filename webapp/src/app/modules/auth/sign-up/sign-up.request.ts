export class SignUpRequest {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;

    constructor(initial?: Partial<SignUpRequest>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }
}
