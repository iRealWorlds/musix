import { EnvironmentConfig } from "src/app/core/environment/environment.config.model";

const configuration = new EnvironmentConfig();
configuration.production = true;

export const environment = configuration;
