import "react-i18next";
import ns from "./locales/ja.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "ns";
    resources: {
      ns: typeof ns;
    };
  }
}
