import { ConfigurationType } from './configuration.type';

export default (): ConfigurationType => ({
  app: {
    port: parseInt(process.env.PORT!, 10),
  },
  auth: {
    saltRounds: parseInt(process.env.SALT_ROUNDS!, 10),
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME!,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
    jwtRefreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME!,
  }!,
  database: {
    host: process.env.POSTGRES_HOST!,
    port: parseInt(process.env.POSTGRES_PORT!, 10),
    db: process.env.POSTGRES_DB!,
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
  },
});
