const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const primaryColor = "#857DB1";
const primaryDarkColor = "#3C3666";
const dangerColor = "#E3242B";
const confirmColor = "#3DED97";
const darkTextColor = "#DCDCDC";
const fontFamily = "OpenSans";

interface Theme {
  fontFamily: string;
  headerBackground: string;
  headerColor: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;

  primaryTextColor: string;
  secondaryTextColor: string;

  borderColor: string;

  cardItemBackground: string;
  dangerColor: string;
  confirmColor: string;
}

interface AvailableThemes {
  light: Theme;
  dark: Theme;
}

export const Colors: AvailableThemes = {
  light: {
    fontFamily: fontFamily,
    headerBackground: primaryColor,
    headerColor: "#FFFFFF",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primaryTextColor: "#5D656B",
    secondaryTextColor: "#697386",
    borderColor: "#E3E8EE",
    cardItemBackground: "#F3F3F3",
    dangerColor,
    confirmColor,
  },
  dark: {
    fontFamily: fontFamily,
    headerBackground: primaryDarkColor,
    headerColor: "#DCDCDC",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primaryTextColor: darkTextColor,
    secondaryTextColor: darkTextColor,
    borderColor: "#3E4042",
    cardItemBackground: "#202020",
    dangerColor,
    confirmColor,
  },
};
