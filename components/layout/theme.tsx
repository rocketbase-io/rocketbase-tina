import * as React from "react";
import GlobalData from "../../content/global/index.json";

const ThemeContext = React.createContext({
  ...GlobalData.theme,
  toggleDarkMode: () => {},
  isDark: false,
});

export const useTheme = () => React.useContext(ThemeContext);

const updateRenderColorMode = (themeMode: "dark" | "light") => {
  if (typeof window !== "undefined") {
    const root = window.document.documentElement;

    root.classList.remove("dark");
    root.classList.remove("light");

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && themeMode === "dark")
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

const getIsDark = () => {
  if (typeof window === "undefined") return;
  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && getUserSystemDarkMode() === "dark")
  );
};

export const getUserSystemDarkMode = () => {
  if (typeof window !== "undefined") {
    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

    if (userMedia.matches) {
      return "dark";
    }
  }

  return "light";
};

export const Theme = ({ data, children }) => {
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    setIsDark(getIsDark());
  });
  const toggleDarkMode = () => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    const dark = getIsDark();
    root.classList.remove("dark");
    root.classList.remove("light");
    root.classList.add(dark ? "light" : "dark");
    localStorage.setItem("theme", dark ? "light" : "dark");
    setIsDark(!dark);
  };

  const [systemDarkMode, setSystemDarkMode] = React.useState(
    getUserSystemDarkMode()
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");

      const updateSystemMediaPreference = (event) => {
        setSystemDarkMode(event.matches ? "dark" : "light");
      };

      userMedia.addEventListener("change", updateSystemMediaPreference);

      return () =>
        userMedia.removeEventListener("change", updateSystemMediaPreference);
    }
    return;
  }, [setSystemDarkMode]);

  const {
    color = "blue",
    icon = "boxicon",
    font = "sans",
    darkMode = "system",
  } = data;

  React.useEffect(() => {
    updateRenderColorMode(
      darkMode === "system"
        ? systemDarkMode
        : darkMode !== ""
        ? darkMode
        : "light"
    );
  }, [systemDarkMode, darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        color,
        icon,
        font,
        darkMode,
        toggleDarkMode,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
