import { Identity } from "src/app/core/auth/identity.model";

export interface AuthSession {
    token: string;
    identity: Identity;
}
