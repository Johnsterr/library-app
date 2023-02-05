// @ts-nocheck
const {env} = process;
export const config = () => {
  //console.log("env", env);

  return {
    host: env.HOST || "localhost",
    port: +env.PORT || 3000,
    mongodbUrl: env.ME_CONFIG_MONGODB_URL!,
    jwtSecret: env.JWT_SECRET || "secret",
  };
};
