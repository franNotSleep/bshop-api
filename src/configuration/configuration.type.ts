type AppConfig = {
  port: number;
};

type AuthConfig = {
  saltRounds: number;
  jwtSecret: string;
  jwtExpirationTime: string;
  jwtRefreshSecret: string;
  jwtRefreshExpirationTime: string;
};

type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  db: string;
};

export type ConfigurationType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
};
