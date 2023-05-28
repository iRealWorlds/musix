export class EnvironmentConfig {
  production = true;

  api = {
    baseUri: 'http://127.0.0.1:3000',
    endpoints: {
      authSessions: "/auth-sessions",
      users: "/users",
      artists: '/artists',
      tracks: '/tracks',
    }
  };

  /**
   * EnvironmentConfig constructor method.
   *
   * @param initial
   */
  constructor(initial?: Partial<EnvironmentConfig>) {
    Object.assign(this, initial);
  }
}
