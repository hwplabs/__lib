// import EnvHelper from "lib/skyhook/...";

const IEnvHelper = {
  LOCAL: "local",
  DEV: "dev",
  STAGING: "staging",
  PRODUCTION: "production",
};

const checkEnv = (value) => process.env.NODE_ENV === value;

export default class EnvHelper {
  // value = "local";
  static isLocal = () => checkEnv(IEnvHelper.LOCAL);
  static ifLocal = (yes, no) => (checkEnv(IEnvHelper.LOCAL) ? yes : no);

  // value = "dev";
  static isDev = () => checkEnv(IEnvHelper.DEV);
  static ifDev = (yes, no) => (checkEnv(IEnvHelper.DEV) ? yes : no);

  // value = "staging";
  static isStaging = () => checkEnv(IEnvHelper.STAGING);
  static ifStaging = (yes, no) => (checkEnv(IEnvHelper.STAGING) ? yes : no);

  // value = "production";
  static isProduction = () => checkEnv(IEnvHelper.PRODUCTION);
  static ifProduction = (yes, no) =>
    checkEnv(IEnvHelper.PRODUCTION) ? yes : no;
}
