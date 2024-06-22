import "dotenv/config";

import { version, name } from "./package.json";

const versionBuild = 1;

export default {
  name: "Check List App",
  slug: "check-list-app",
  version: version || "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  assetBundlePatterns: ["**/*"],
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#857DB1",
  },
  extra: {
    baseUrl: process.env.EXPO_PUBLIC_BACKEND_BASE_URL,
  },
  ios: {
    bundleIdentifier: "com.alluisio.check-list-app",
    supportsTablet: true,
    buildNumber: `${versionBuild}`,
  },
  android: {
    versionCode: versionBuild,
    package: "com.alluisio.check-list-app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#857DB1",
    },
  },
  androidStatusBar: {
    barStyle: "light-content",
    translucent: true,
  },
  plugins: ["expo-router"],
  runtimeVersion: `${versionBuild}`,
};
